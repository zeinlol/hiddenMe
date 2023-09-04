# include .env if exists (some tasks need variables from .env file)
-include .env

.PHONY: migrations
migrations:
	@python manage.py makemigrations

.PHONY: migrate
migrate:
	@python manage.py migrate

.PHONY: showmigrations
showmigrations:
	@python manage.py showmigrations

.PHONY: front-i-run-dev
front-i-run-dev:
	@npm run dev
