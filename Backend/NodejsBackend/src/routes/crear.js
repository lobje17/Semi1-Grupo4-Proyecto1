const { Router } = require('express');
const rds = require('../AWS/AWSKeys');
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
  
    // Value to be inserted
    database.query(query, [nombreUsuario, 
        correo,contrasenia, fotoURL], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
            + rows.Personid);
        res.json({
            message: 'Usuario Ingresado Correctamente',
            status : '200',
            idUsuario : rows.Personid
        })
    });
});

//Login
router.post('/Login',async(req, res) => {    
    let {correo,contrasenia} = req.body
    var sql = 'SELECT Personid, nombreUsuario,correo, fotoperfil FROM Usuario WHERE contrasenia = ? and correo = ?';
    database.query(sql, [contrasenia, correo], function (err, result) {
        console.log(result);
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
module.exports = router;