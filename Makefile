-include .env
start:
	docker compose up -d --build
stop:
	docker compose down
django-migrate-users:
	docker exec -it servidorweb python manage.py makemigrations users
	docker exec -it servidorweb python manage.py migrate users
django-migrate-games:
	docker exec -it servidorweb python manage.py makemigrations games
	docker exec -it servidorweb python manage.py migrate games
django-migrate:
	docker exec -it servidorweb python manage.py makemigrations
	docker exec -it servidorweb python manage.py migrate
terminal-servidorweb:
	docker exec -it servidorweb /bin/bash
lsresources:
	docker ps
	docker volume ls
	docker network ls
