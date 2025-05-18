NAME=apotheosis

$(NAME): start-docker
	docker-compose -f ./docker-compose.yml up --build -d

all: start-docker $(NAME)

start-docker:
	@echo "🚀 Starting Docker Desktop..."
	@open -a Docker
	@echo "⏳ Waiting for Docker to be ready..."
	@until docker ps > /dev/null 2>&1; do \
		sleep 1; \
		echo "Still waiting for Docker..."; \
	done
	@echo "✅ Docker is running!"
clean:
	docker-compose -f ./docker-compose.yml down --rmi all -v --remove-orphans 2>/dev/null || true

fclean: clean
	docker rmi -f $$(docker images -a -q) 2> /dev/null || true
	docker volume prune -f

re: fclean all

.PHONY: all start-docker $(NAME) clean fclean re check-docker
