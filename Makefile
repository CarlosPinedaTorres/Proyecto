-include .env

start:
	docker compose up -d --build
stop:
	docker compose down
django-migrate:
	docker exec -it ${APP_NAME}_servidorweb python manage.py makemigrations
	docker exec -it ${APP_NAME}_servidorweb python manage.py migrate
manual-start:
	docker network create servicios
	docker run --name ${APP_NAME}_servidor-mariadb -d -p ${PUERTO_MARIADB}:3306 -e MARIADB_ROOT_PASSWORD=${PASSWORD_ROOT_BASEDATOS} -e MARIADB_DATABASE=${NOMBRE_BASEDATOS} -e MARIADB_USER=${USUARIO_BASEDATOS} -e MARIADB_PASSWORD=${PASSWORD_USER_BASEDATOS} -v ./db:/var/lib/mysql --network servicios mariadb:10.9
	docker build . -t servidor
	docker run --name ${APP_NAME}_servidorweb -d -p 8080:80 -v ./todo-app:/usr/src/app --network servicios servidor
	docker run --name ${APP_NAME}_phpmyadmin -d -p ${PUERTO_PHPMYADMIN}:80 -e PMA_ARBITRARY=1 --network servicios phpmyadmin
	docker exec -it ${APP_NAME}_servidorweb python manage.py makemigrations
	docker exec -it ${APP_NAME}_servidorweb python manage.py migrate
terminal-servidorweb:
	docker exec -it ${APP_NAME}_servidorweb /bin/bash
lsresources:
	docker ps
	docker volume ls
	docker network ls
printmariadb:
	docker logs ${APP_NAME}_servidor-mariadb
manual-stop:
	docker stop ${APP_NAME}_servidor-mariadb ${APP_NAME}_phpmyadmin ${APP_NAME}_servidorweb
	docker rm ${APP_NAME}_servidor-mariadb ${APP_NAME}_phpmyadmin ${APP_NAME}_servidorweb
	docker network rm servicios
	docker rmi servidor
