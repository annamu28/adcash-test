#!/bin/bash

# Function to display usage
show_usage() {
    echo "Usage: ./db.sh [command]"
    echo "Commands:"
    echo "  start     - Start the database container"
    echo "  stop      - Stop the database container"
    echo "  restart   - Restart the database container"
    echo "  status    - Check the status of the database container"
    echo "  logs      - View database logs"
    echo "  shell     - Access MySQL shell"
}

# Check if command is provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

# Process commands
case "$1" in
    "start")
        docker-compose -f docker-compose.db.yml up -d
        echo "Database container started"
        ;;
    "stop")
        docker-compose -f docker-compose.db.yml down
        echo "Database container stopped"
        ;;
    "restart")
        docker-compose -f docker-compose.db.yml restart
        echo "Database container restarted"
        ;;
    "status")
        docker-compose -f docker-compose.db.yml ps
        ;;
    "logs")
        docker-compose -f docker-compose.db.yml logs -f
        ;;
    "shell")
        docker exec -it adcash_mysql mysql -uadcash_user -proot
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 