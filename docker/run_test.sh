docker-compose build
docker-compose up -d 
sleep 3
docker exec -i docker_node_1 npm test
