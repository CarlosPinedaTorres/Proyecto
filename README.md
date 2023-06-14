# Proyecto de Desarrollo Web: GameMasters

## Descripción
Este proyecto se trata de un proyecto para final de grado de Carlos Pineda Torres. Se trata de una aplicacion para gestionar una aplicacion de compra venta de juegos.
## Tutores del proyecto
- [Fernández , Gonzalo](https://github.com/GonxFH) [Tutor General]

## Requisitos
- Es necesario tener instalado [Docker](https://www.docker.com/)
- Es recomendable tener Make instalado. Si no lo tienes, puedes copiar los comandos del Makefile y ejecutarlos manualmente

## Instalación
1. Descarga el proyecto o clónalo con Git.
2. Copia y modifica el fichero ".env.example" con el nombre ".env".(Personalizalo, pero deberia funcionar).
3. Usa el comando "make start" y  make django-migrate.
4. Listo

## Uso
1. Ejecuta el comando "make up" para levantar los contenedores mostrando o no el prompt.
2. Ejecuta un make django-migrate-users
3. Ejecuta un make django-migrate-games
4. Ejecuta un make django-migrate
5. En ese mismo orden en caso de error borra la base de datos y vuelve a levantar el contenedor y ejecutar los make
6. Usa el make terminal-servidorweb y dentro crea un super usuario con python manage.py createsuperuser.
8. Accede a la aplicación por defecto desde http://localhost:8000 (Servidor) http://localhost:5173 (Cliente).
