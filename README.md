## Instrucciones de ejecución local

- Instalar Docker
- Crear un archivo .env con el contenido en [.env.example](./.env.example)
- Correr el siguiente comando en la terminal:

```sh
sh ./scripts/dev.sh
```

Este comando montará una red de contenedores en la cual se encuentrar el servidor de desarrollo de
Angular, la app en Express con el codigo del lado del servidor, y una base de datos PostgreSQL. El
script de inicialización de encargará automáticamente de instalar las dependencias necesarias y de
crear y poblar las tablas en caso de ser necesario.
