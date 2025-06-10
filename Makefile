NAME=apotheosis

$(NAME): start-docker
	chmod +x generate_cert.sh
	./generate_cert.sh
	docker-compose -f ./docker-compose.yml up --build -d

all: $(NAME)

start-docker:
	@echo "🚀 Starting Docker Desktop..."
	@open -a Docker
	@echo "⏳ Waiting for Docker to be ready..."
	@until docker ps > /dev/null 2>&1; do \
		sleep 1; \
		echo "Still waiting for Docker..."; \
	done
	@echo "✅ Docker is running!"

# start-docker:
# 	cmd /C ":loop & docker info > nul 2>&1"

clean:
	@containers=$$(docker ps -aq); \
	if [ -n "$$containers" ]; then \
		docker stop $$containers && docker rm -f $$containers; \
		rm -rf cert; \
		rm -rf ./backend/cert;\
		rm -rf ./frontend/cert;\
		echo "Removing all the containers."; \
	else \
		echo "No containers to stop/remove."; \
	fi
	@docker-compose -f ./docker-compose.yml down --rmi all -v --remove-orphans 2>/dev/null || true

fclean: clean
	docker rmi -f $$(docker images -a -q) 2> /dev/null || true
	docker volume prune -f

re: fclean all

.PHONY: all start-docker $(NAME) clean fclean re check-docker
