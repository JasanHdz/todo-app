# Next.js TodoApp Challenge

Aplicacion TODOAPP: esta aplicación es una aplicación web que corre del lado del servido usando SSR

## Instalaciones Necesarias

* [Visual Studio Code](https://code.visualstudio.com/)

* [Postman](https://www.postman.com/downloads/)

* [Mongo Compass](https://www.mongodb.com/try/download/compass)

* [Node](https://nodejs.org/es/)

* [Docker Desktop](https://www.docker.com/get-started)


## ¿Cómo funciona?

Requiere Node.JS > 16

- `npm install --global yarn` para instalar yarn.
- `yarn` para instalar las dependencias.
- `yarn dev` para el entorno de desarrollo.
- `yarn build && npm run start` para el entorno de producción.

## TODO

- Deberá crear un archivo de configuración para que Next.JS pueda leer las variables de entorno.
- el archivo se llamará: ``.env.local`` a este archivo pegue las variables de ejemplo que estan el el archivo ``.env.example``


## Base de datos

para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

* El -d significa __detached__

MongoDB URL Local:
```
mongodb://localhost:27017/todoAppDB
```

### Llenar la base de datos con información de pruebas

```
    http://localhost:3000/api/seed
```

## Licencia

MIT - Copyright © 2022 Jasan Hernández, Inc. All rights reserved.
