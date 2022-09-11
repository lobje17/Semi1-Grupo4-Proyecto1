from flask import Flask,render_template, request
from flask import jsonify
from flask_mysqldb import MySQL
import boto3
import base64
import io
import six
import uuid
import imghdr
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'database-1.cy4vohpq0xqv.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'Semi_2022'
app.config['MYSQL_DB'] = 'superStorage'
app.config['MYSQL_PORT'] = 3306

app.config['S3_BUCKET'] = "archivossemi1"
app.config['S3_KEY'] = "AKIAQYIYQQLB2GMWWQHZ"
app.config['S3_SECRET'] = "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"
app.config['S3_LOCATION'] = 'us-east-1'
mysql = MySQL(app)

s3 = boto3.client(
   "s3",
   aws_access_key_id=app.config['S3_KEY'],
   aws_secret_access_key=app.config['S3_SECRET']
)

def get_file_extension(file_name, decoded_file):
    extension = imghdr.what(file_name, decoded_file)
    extension = "jpg" if extension == "jpeg" else extension
    return extension

def decode_base64_file(data):
    """
    Fuction to convert base 64 to readable IO bytes and auto-generate file name with extension
    :param data: base64 file input
    :return: tuple containing IO bytes file and filename
    """
    # Check if this is a base64 string
    if isinstance(data, six.string_types):
        # Check if the base64 string is in the "data:" format
        if 'data:' in data and ';base64,' in data:
            # Break out the header from the base64 content
            header, data = data.split(';base64,')

        # Try to decode the file. Return validation error if it fails.
        try:
            decoded_file = base64.b64decode(data)
        except TypeError:
            TypeError('invalid_image')

        # Generate file name:
        file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
        # Get the file name extension:
        file_extension = get_file_extension(file_name, decoded_file)

        complete_file_name = "%s.%s" % (file_name, file_extension,)

        return io.BytesIO(decoded_file), complete_file_name

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"

@app.route('/Registro', methods = ['POST', 'GET'])
def Registro():
    if request.method == 'GET':
        return "Login via the login Form"
     
    if request.method == 'POST':
        #print(request.json)
        #request.args para traer datos de la url
        #request.json para traer datos del body
        correo = request.json['correo']
        contrasenia = request.json['contrasenia']
        fotoURL = request.json['fotoURL']
        nombreUsuario = request.json['nombreUsuario']
        print('nombreUsuario')
        print(nombreUsuario)
        #decodedImage = bytearray(base64.b64decode(fotoURL))
        bucket_name = app.config['S3_BUCKET']
        file, file_name = decode_base64_file(fotoURL)
        file_name = f'Semi/admin_{nombreUsuario}.jpg'
        s3.upload_fileobj(
            file,
            bucket_name,
            file_name,
            ExtraArgs={'ACL': 'public-read'}
        )
        fotoaws = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
        print('fotoaws')
        print(fotoaws)
        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO Usuario (nombreUsuario, correo,contrasenia,fotoperfil) VALUES (%s, %s , %s, %s)''',(nombreUsuario,correo,contrasenia,fotoaws))
        mysql.connection.commit()
        cursor.close()
        return jsonify({
            'message': 'Usuario Ingresado Correctamente',
            'status' : '200',
            'idUsuario' : cursor.lastrowid})

@app.route('/Login', methods=['POST'])
def Login():
    correo = request.json['correo']
    contrasenia = request.json['contrasenia']
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT Personid, nombreUsuario,correo, fotoperfil FROM Usuario WHERE contrasenia = %s and correo = %s ''',(contrasenia,correo))
    #user = cursor.fetchone()
    # print(user)
    columns = cursor.description 
    result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    
    cursor.close()
    print(len(result))

    if len(result) == 0:
        return jsonify({
                'message': 'Usuario no se encuentra',
                'status' : '400'
            })
    else :
        return  jsonify({'message': 'Usuario logeado Correctamente',
            'data' : result ,
            'status' : '200'})

@app.route('/AgregarAmigo', methods=['POST'])
def AgregarAmigo():
    IdAmigoEmisor = request.json['IdAmigoEmisor']
    IdAmigoReceptor = request.json['IdAmigoReceptor']
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO Amigos (idAmigoEmisor, idAmigoReceptor) VALUES (%s, %s ) ''',(IdAmigoEmisor,IdAmigoReceptor))
    mysql.connection.commit()
    cursor.close()
    return  jsonify({'message': 'Amigo agregado Correctamente',
        'status' : '200'})

@app.route('/Usuarios', methods=['GET'])
def Usuarios():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT u.Personid, u.nombreUsuario,u.correo, u.fotoperfil , IFNULL(sub.conteo, 0) as conteo
        FROM (select count(1) as conteo,a.personid
        from Archivo as a 
        where a.isPublic = '1'
        group by a.Personid ) as sub
        right join Usuario as u on u.Personid = sub.personid ''')
    #usuarios = cursor.fetchall()
    columns = cursor.description 
    result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return  jsonify({'message': 'Listado de Usuarios',
        'data': result,
        'status' : '200'})

@app.route('/SubirArchivo', methods=['POST'])
def SubirArchivo():
    
    BASE64 = request.json['BASE64']
    CONTENIDO = request.json['CONTENIDO']
    NOMBRE = request.json['NOMBRE']
    PUBLICO = request.json['PUBLICO']
    IdUsuario = request.json['IdUsuario']
    bucket_name = app.config['S3_BUCKET']
    file, file_name = decode_base64_file(BASE64)
    file_name = f'Semi/{NOMBRE}'
    s3.upload_fileobj(
        file,
        bucket_name,
        file_name,
        ExtraArgs={'ACL': 'public-read', "ContentType":CONTENIDO}
    )
    fotoaws = f"https://{bucket_name}.s3.amazonaws.com/{file_name}"
    print('fotoaws')
    print(fotoaws)
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO Archivo (nombreArchivo, isPublic,URL,Personid) VALUES (%s, %s , %s, %s)''',(NOMBRE,PUBLICO,fotoaws,IdUsuario))
    mysql.connection.commit()
    cursor.close()
    return jsonify({
        'message': 'Archivo Subido Correctamente',
        'status' : '200',
        'idUsuario' : cursor.lastrowid})

@app.route('/ArchivosPublicos/<id>', methods=['GET'])
def ArchivosPublicos(id):
    print('ArchivosPublicos')
    
    print(id)
    cursor = mysql.connection.cursor()
    cursor.execute(''' select a.idArchivo, a.nombreArchivo, a.isPublic, a.URL, a.Personid, u.nombreUsuario
    from Archivo as a
    inner join Usuario as u on u.Personid = a.Personid
    where a.isPublic = '1' and a.Personid IN (select u2.Personid
    from Amigos as am
    inner join Usuario as u on u.Personid = am.idAmigoEmisor
    inner join Usuario as u2 on u2.Personid = am.idAmigoReceptor
    where am.idAmigoEmisor = %s)
    union
    select a.idArchivo, a.nombreArchivo, a.isPublic, a.URL, a.Personid, u.nombreUsuario
    from Archivo as a
    inner join Usuario as u on u.Personid = a.Personid
    where a.isPublic = '1' and a.Personid = %s; ''',(id,id))
    #archivos = cursor.fetchall()
    columns = cursor.description 
    result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return  jsonify({'message': 'Listado de Archivos',
        'data': result,
        'status' : '200'})

@app.route('/ArchivosPrivados/<id>', methods=['GET'])
def ArchivosPrivados(id):
    
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * from Archivo  where Personid = %s and isPublic = '0' ''',(id))
    #archivos = cursor.fetchall()
    columns = cursor.description 
    result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return  jsonify({'message': 'Listado de Archivos',
        'data': result,
        'status' : '200'})

@app.route('/EditarArchivo', methods=['PUT'])
def EditarArchivo():
    idArchivo = request.json['idArchivo']
    nombreArchivo = request.json['nombreArchivo']
    visibilidad = request.json['visibilidad']
    contrasenia = request.json['contrasenia']
    correo = request.json['correo']

    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT Personid, nombreUsuario,correo, fotoperfil FROM Usuario WHERE contrasenia = %s and correo = %s ''',(contrasenia,correo))
    mysql.connection.commit()
    user = cursor.fetchone()
    cursor.close()
   
    if user is None:
        return jsonify({
                'message': 'credenciales invalidas',
                'status' : '400'
            })
    else :
        cursor = mysql.connection.cursor()
        cursor.execute(''' UPDATE Archivo SET nombreArchivo =%s, isPublic = %s WHERE idArchivo = %s; ''',(nombreArchivo,visibilidad,idArchivo))
        mysql.connection.commit()
        cursor.close()
        return  jsonify({'message': 'Archivos editado correctamente',
            'status' : '200'})

@app.route('/deleteArchivo', methods=['DELETE'])
def deleteArchivo():
    id = request.args['id']
    cursor = mysql.connection.cursor()
    cursor.execute(f' DELETE FROM Archivo WHERE idArchivo = {id}')
    mysql.connection.commit()
    cursor.close()
    return  jsonify({'message': 'Archivo Eliminado Correctamente',
        'status' : '200'})
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3004)