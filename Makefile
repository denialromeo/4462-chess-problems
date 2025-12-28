.PHONY: build run stop clean

build:
	docker compose build

run:
	docker compose up -d --build
	@echo "Running at http://localhost:3000"

stop:
	docker compose down

clean:
	docker compose down --rmi all
