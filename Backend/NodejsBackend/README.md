# Semi1-Grupo4-Proyecto1
## Para correr el server de forma local estar en la carpeta src y ejecutar node index.js 
# Endpoint Registro de Usuarios
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/Registro          |
| **Tipo Método**   | POST      |
| **Header de petición**   | No aplica      |

```javascript

{
    "nombreUsuario" : "Armando",
    "fotoURL" : "deben de mandar en base64",
    "contrasenia" : "1234",
    "correo" : "arma@gmail.com"
}
```


# Endpoint Login
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/Login          |
| **Tipo Método**   | POST      |
| **Header de petición**   | No aplica      |

```javascript

{
    "correo": "arma@gmail.com",
    "contrasenia": "1234"
}
```

# Endpoint Subir Archivo
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/SubirArchivo          |
| **Tipo Método**   | POST      |
| **Header de petición**   | No aplica      |

```javascript

{
    "BASE64" : "convertir a base64 el archivo",
    "CONTENIDO" : "application/pdf",
    "NOMBRE" : "Test.pdf"
}
```
#### Respuesta
```javascript

{
    "message": "Archivo Subido Correctamente",
    "link": "https://archivossemi1.s3.amazonaws.com/Semi/Test.pdf",
    "status": "200"
}
```