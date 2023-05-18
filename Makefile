-include .env

start:
	docker compose up -d --build
stop:
	docker compose down
django-migrate:
    docker exec -it servidorweb python manage.py makemigrations users
    docker exec -it servidorweb python manage.py migrate users
    docker exec -it servidorweb python manage.py makemigrations
    docker exec -it servidorweb python manage.py migrate
terminal-servidorweb:
	docker exec -it servidorweb /bin/bash
lsresources:
	docker ps
	docker volume ls
	docker network ls
