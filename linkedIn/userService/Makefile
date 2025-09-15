include .env

MIGRATION_FOLDER=db/migration

migration-create:
	goose -dir ${MIGRATION_FOLDER} create $(name) sql

migration-up:
	goose -dir ${MIGRATION_FOLDER} mysql ${DB_URL} up