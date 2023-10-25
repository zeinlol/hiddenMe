# include .env if exists (some tasks need variables from .env file)
-include .env

.PHONY: py-venv
py-venv:
	. venv/bin/activate

.PHONY: migrations
migrations:
	@make py-venv &&\
	python manage.py makemigrations

.PHONY: migrate
migrate:
	@py-venv &&\
	python3.11 manage.py migrate

.PHONY: run-server
run-server:
	@py-venv &&\
	python manage.py runserver

.PHONY: create-superuser
create-superuser:
	@py-venv &&\
	python manage.py createsuperuser

.PHONY: showmigrations
showmigrations:
	@py-venv &&
	python manage.py showmigrations

.PHONY: front-i-run-dev
front-i-run-dev:
	@ cd ui && npm run dev

.PHONY: front-i-build
front-i-build:
	@cd ui && npm install

.PHONY: front-i-audit-fix
front-i-audit-fix:
	@cd ui && npm audit fix

.PHONY: front-i-audit-fix-force
front-i-audit-fix-force:
	@cd ui && npm audit fix --force

.PHONY: front-i-build--and-run-dev
front-i-build--and-run-dev:
	make front-i-build && \
 	make front-i-run-dev
