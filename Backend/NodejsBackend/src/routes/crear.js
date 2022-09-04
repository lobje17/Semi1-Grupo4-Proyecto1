const { Router } = require('express');
const keys = require('../AWS/s3keys');
const AWS = require('aws-sdk');
const s3 = new AWS.S3(keys.S3);
const database = require('../AWS/AWSKeys');

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
    var sql = 'SELECT Personid, nombreUsuario,correo, fotoperfil FROM Usuario ';
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

module.exports = router;
