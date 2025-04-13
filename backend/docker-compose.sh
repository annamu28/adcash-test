#!/bin/bash

# Function to display usage
show_usage() {
    echo "Usage: ./docker-compose.sh [command]"
    echo "Commands:"
    echo "  up        - Start all containers"
    echo "  down      - Stop all containers"
    echo "  restart   - Restart all containers"
    echo "  status    - Check the status of all containers"
    echo "  logs      - View logs from all containers"
    echo "  shell     - Access MySQL shell"
    echo "  app       - Access Laravel application container"
}

# Check if command is provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

# Process commands
case "$1" in
    "up")
        docker-compose -f composer.yaml up -d
        echo "All containers started"
        ;;
    "down")
        docker-compose -f composer.yaml down
        echo "All containers stopped"
        ;;
    "restart")
        docker-compose -f composer.yaml restart
        echo "All containers restarted"
        ;;
    "status")
        docker-compose -f composer.yaml ps
        ;;
    "logs")
        docker-compose -f composer.yaml logs -f
        ;;
    "shell")
        docker exec -it adcash_mysql mysql -uadcash_user -proot
        ;;
    "app")
        docker exec -it adcash_app bash
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 