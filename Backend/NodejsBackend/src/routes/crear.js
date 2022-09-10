const { Router } = require('express');
const keys = require('../AWS/s3keys');
const AWS = require('aws-sdk');
const s3 = new AWS.S3(keys.S3);
const database = require('../AWS/AWSKeys');
var verificado = false;
const router = Router();
/*
{
    "BASE64" : "",
    "CONTENIDO" : "image/jpeg",
    "NOMBRE": "test (1).jpg"
}

*/
router.post('/Registro',async(req, res) => {    
    let {correo,contrasenia,fotoURL,nombreUsuario} = req.body
    let query = `INSERT INTO Usuario 
        (nombreUsuario, correo,contrasenia,fotoperfil) VALUES (?, ? , ?, ?);`;
    //Subir foto
    let decodedImage = Buffer.from(fotoURL, 'base64');
    let bucket = 'archivossemi1';
    let filepath = `Semi/admin_${nombreUsuario}.jpg`;
    let fotoaws = '';
    let uploadParamsS3 = {
      Bucket: bucket,
      Key: filepath,
      Body: decodedImage,
      ACL: 'public-read',
    };
    const uploadedImage = await s3.upload({
        Bucket: uploadParamsS3.Bucket,
        Key: uploadParamsS3.Key,
        Body: uploadParamsS3.Body,
        ACL: 'public-read'
      }).promise()
      fotoaws = uploadedImage.Location;
    // Value to be inserted
    database.query(query, [nombreUsuario, 
        correo,contrasenia, fotoaws], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
            + rows.insertId);
        res.json({
            message: 'Usuario Ingresado Correctamente',
            status : '200',
            idUsuario : rows.insertId
        })
    });
});

//Login
router.post('/Login',async(req, res) => {    
    let {correo,contrasenia} = req.body
    var sql = 'SELECT Personid, nombreUsuario,correo, fotoperfil FROM Usuario WHERE contrasenia = ? and correo = ?';
    database.query(sql, [contrasenia, correo], function (err, result) {
        if (result.length == 0){
            res.json({
                message: 'Usuario no se encuentra',
                status : '400'
            })
        }else{
            res.json({
                message: 'Usuario logeado Correctamente',
                data : result,
                status : '200'
            })
        }
})
});
//Upload Archivos
/*
{
    "BASE64" : "",
    "CONTENIDO" : "image/jpeg",
    "NOMBRE": "test (1).jpg",
    "PUBLICO" : 1,
    "IdUsuario" : 1
}

*/
router.post('/SubirArchivo',async(req, res) => {    
    let {BASE64,CONTENIDO,NOMBRE,PUBLICO,IdUsuario} = req.body
    let query = `INSERT INTO Archivo 
        (nombreArchivo, isPublic,URL,Personid) VALUES (?, ? , ?, ?);`;
    //Subir foto
    let decodedImage = Buffer.from(BASE64, 'base64');
    let bucket = 'archivossemi1';
    let filepath = `Semi/${NOMBRE}`;
    let fotoaws = '';
    let uploadParamsS3 = {
      Bucket: bucket,
      Key: filepath,
      Body: decodedImage,
      ACL: 'public-read',
    };
    const uploadedImage = await s3.upload({
        Bucket: uploadParamsS3.Bucket,
        Key: uploadParamsS3.Key,
        Body: uploadParamsS3.Body,
        ACL: 'public-read',
        ContentType: CONTENIDO
      }).promise()
      fotoaws = uploadedImage.Location;
      // Value to be inserted
    database.query(query, [NOMBRE, 
        PUBLICO,fotoaws, IdUsuario], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
            + rows.insertId);
        res.json({
            message: 'Archivo Subido Correctamente',
            status : '200',
            idArchivo : rows.insertId
        })
    });
});
//AgregarAmigo
/*
{
    "IdAmigoEmisor" : 1,
    "IdAmigoReceptor" : 2
}

*/
router.post('/AgregarAmigo',async(req, res) => {    
    let {IdAmigoEmisor,IdAmigoReceptor} = req.body
    let query = `INSERT INTO Amigos 
        (idAmigoEmisor, idAmigoReceptor) VALUES (?, ? );`;
          // Value to be inserted
        database.query(query, [IdAmigoEmisor, 
            IdAmigoReceptor], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = "
                + rows.insertId);
            res.json({
                message: 'Amigo agregado Correctamente',
                status : '200'
            })
        });
});
//Obtener lista de todos los usuario
//Login
router.get('/Usuarios',async(req, res) => {    
    var sql = 'SELECT u.Personid, u.nombreUsuario,u.correo, u.fotoperfil , IFNULL(sub.conteo, 0) as conteo\n' +
    '    FROM (select count(1) as conteo,a.personid\n' +
    '    from Archivo as a \n' +
    '    where a.isPublic = \'1\'\n' +
    '    group by a.Personid ) as sub\n' +
    '    right join Usuario as u on u.Personid = sub.personid';
    database.query(sql, function (err, result) {
        if (result.length == 0){
            res.json({
                message: 'Usuario no se encuentra',
                status : '400'
            })
        }else{
            res.json({
                message: 'Listado de Usuarios',
                data : result,
                status : '200'
            })
        }
})
});
//Obtener listado de Archivos
router.get('/ArchivosPublicos/:id',async(req, res) => { 
    var id = req.params.id;   
    var sql = 'select a.idArchivo, a.nombreArchivo, a.isPublic, a.URL, a.Personid, u.nombreUsuario\n' +
    'from Archivo as a\n' +
    'inner join Usuario as u on u.Personid = a.Personid\n' +
    'where a.isPublic = \'1\' and a.Personid IN (select u2.Personid\n' +
    'from Amigos as am\n' +
    'inner join Usuario as u on u.Personid = am.idAmigoEmisor\n' +
    'inner join Usuario as u2 on u2.Personid = am.idAmigoReceptor\n' +
    'where am.idAmigoEmisor = ?)\n' +
    'union\n' +
    'select a.idArchivo, a.nombreArchivo, a.isPublic, a.URL, a.Personid, u.nombreUsuario\n' +
    'from Archivo as a\n' +
    'inner join Usuario as u on u.Personid = a.Personid\n' +
    'where a.isPublic = \'1\' and a.Personid = ?;\n';
    database.query(sql,[id,id], function (err, result) {
        if (result.length == 0){
            res.json({
                message: 'Archivos no se encuentra',
                status : '400',
                data : []
            })
        }else{
            res.json({
                message: 'Listado de Archivos',
                data : result,
                status : '200'
            })
        }
})
});
//Obtener listado de Archivos
router.get('/ArchivosPrivados/:id',async(req, res) => { 
    var id = req.params.id;   
    var sql = 'SELECT * from Archivo  where Personid = ? and isPublic = \'0\'';
    database.query(sql,[id], function (err, result) {
        if (result.length == 0){
            res.json({
                message: 'Archivos no se encuentra',
                data : [],
                status : '400'
            })
        }else{
            res.json({
                message: 'Listado de Archivos',
                data : result,
                status : '200'
            })
        }
})
});

//Endpoint para editar
//Obtener listado de Archivos
router.put('/EditarArchivo',async(req, res) => { 
    var {idArchivo,nombreArchivo,visibilidad,contrasenia,correo} = req.body;
    var sql = 'UPDATE Archivo SET nombreArchivo =?, isPublic = ? WHERE idArchivo = ?;';  
    var sql2 = 'SELECT * FROM Usuario WHERE contrasenia = ? and correo = ?';
    database.query(sql2, [contrasenia, correo], function (err, result) {
        if(err){
            res.json({
                message: 'Error al ejecutar la consulta',
                status : '400'
            })
        }else{
        if (result.length == 0){
            res.json({
                message: 'Contrasenia no coincide',
                status : '400'
            })
            verificado = false
        }else{
            database.query(sql,[nombreArchivo,visibilidad,idArchivo], function (err, result) {
                if (result.length == 0){
                    res.json({
                        message: 'Archivos no se encuentra',
                        status : '400'
                    })
                }else{
                    res.json({
                        message: 'Archivos editado correctamente',
                        status : '200'
                    })
                }
        })
        }
        }
    }) 
});
//Endpoint delete

router.delete('/deleteArchivo/:id',async(req, res) => { 
    var id = req.params.id;   
    var sql = 'DELETE FROM Archivo WHERE idArchivo = ?';
    database.query(sql,[id], function (err, result) {
        if (result.length == 0){
            res.json({
                message: 'Archivos no se encuentra',
                status : '400'
            })
        }else{
            res.json({
                message: 'Archivo Eliminado Correcatemente',
                data : result,
                status : '200'
            })
        }
})
});
module.exports = router;
