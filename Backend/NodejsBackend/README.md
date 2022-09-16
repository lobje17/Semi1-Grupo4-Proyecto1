# Semi1-Grupo4-Proyecto1
## Para correr el server de forma local estar en la carpeta src y ejecutar node index.js 
# 1. Endpoint Registro de Usuarios 
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
### Response
```javascript

{
    "message" : "Usuario Ingresado Correctamente",
    "status" : "200",
    "idUsuario" : "1"
}
```


# 2. Endpoint Login
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

### Response
```javascript

{
    "message" : "Usuario logeado Correctamente",
    "data": [
        {
            "Personid": 1,
            "nombreUsuario": "EdsonArmando",
            "correo": "arma@gmail.com",
            "fotoperfil": "https://archivossemi1.s3.amazonaws.com/Semi/admin_EdsonArmando.jpg"
        }
        ],
    "status" : "200"
}
```


# 3. Endpoint Subir Archivo
#### Información de método

| INFO  | 1 es publico 0 no es publico|
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

# 4. Endpoint Agregar Amigo
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
### Response
```javascript

{
    "message" : "Amigo agregado Correctamente",
    "status" : "200"
}
```


# 5. Endpoint Listado Usuarios
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | https://localhost:3005/Usuarios          |
| **Tipo Método**   | GET      |
| **Header de petición**   | No aplica      |

### Response
```javascript

{
    "message": "Listado de Usuarios",
    "data": [
        {
            "Personid": 1,
            "nombreUsuario": "EdsonArmando",
            "correo": "arma@gmail.com",
            "fotoperfil": "https://archivossemi1.s3.amazonaws.com/Semi/admin_EdsonArmando.jpg"
        },
        {
            "Personid": 2,
            "nombreUsuario": "Luciana",
            "correo": "arma@gmail.com",
            "fotoperfil": "https://archivossemi1.s3.amazonaws.com/Semi/admin_Luciana.jpg"
        },
        {
            "Personid": 3,
            "nombreUsuario": "Kyara",
            "correo": "arma@gmail.com",
            "fotoperfil": "https://archivossemi1.s3.amazonaws.com/Semi/admin_Kyara.jpg"
        }
    ],
    "status": "200"
}
```

# 6. Endpoint Archivos Privados
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | http://localhost:3005/ArchivosPrivados/4          |
| **Tipo Método**   | GET      |
| **Header de petición**   | No aplica      |

### Response
```javascript

{
    "message": "Listado de Archivos",
    "data": [
        {
            "idArchivo": 7,
            "nombreArchivo": "Test1.pdf",
            "isPublic": "0",
            "URL": "https://archivossemi1.s3.amazonaws.com/Semi/Test1.pdf",
            "Personid": 4
        }
    ],
    "status": "200"
}
```

# 7. Endpoint Archivos Publicos
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | http://localhost:3005/ArchivosPublicos/4          |
| **Tipo Método**   | GET      |
| **Header de petición**   | No aplica      |

### Response
```javascript

{
    "message": "Listado de Archivos",
    "data": [
        {
            "idArchivo": 7,
            "nombreArchivo": "Test1.pdf",
            "isPublic": "0",
            "URL": "https://archivossemi1.s3.amazonaws.com/Semi/Test1.pdf",
            "Personid": 4
        }
    ],
    "status": "200"
}
```

# 7. Endpoint Editar Archivos
#### Información de método

| INFO  | |
| :-----------      | :--------------------- |
| **Url**           | http://localhost:3005/EditarArchivo          |
| **Tipo Método**   | PUT      |
| **Header de petición**   | No aplica      |

```javascript

{"idArchivo":14,
"nombreArchivo":"PruebaNueva",
"visibilidad":1,
"contrasenia":"mia123",
"correo":"mia@gmail.com"}

```
### Response
```javascript

{
    "message": "Archivos editado correctamente",
    "status": "200"
}
```
