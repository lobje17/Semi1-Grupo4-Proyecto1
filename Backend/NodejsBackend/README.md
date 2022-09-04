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
    "BASE64" : "",
    "CONTENIDO" : "image/jpeg",
    "NOMBRE": "test (1).jpg",
    "PUBLICO" : 1,
    "IdUsuario" : 1
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

# Endpoint Agregar Amigo
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/AgregarAmigo          |
| **Tipo Método**   | POST      |
| **Header de petición**   | No aplica      |

```javascript

{
    "IdAmigoEmisor" : 1,
    "IdAmigoReceptor" : 3
}
```

# Endpoint Listado Usuarios
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/Usuarios          |
| **Tipo Método**   | GET      |
| **Header de petición**   | No aplica      |
