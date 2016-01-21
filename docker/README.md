# Docker Containers
The application is composed of 3 Docker containers.

## Node.js
Runs Node.js version 0.12.7 inside a Docker container and exposes port 8000.  

## MongoDB
On the deleopment and production environment, MongoDB runs 
from an image container. 
Currently, we are using [tutum/mongodb](https://hub.docker.com/r/tutum/mongodb/).
In the test environment, we use the MongoDB sever provided by CircleCI.


## Redis
On the deleopment and production environment, Redis runs 
from an image container. 
Currently, we are using [redis](https://hub.docker.com/_/redis/).
In the test environment, we use the Redis sever provided by CircleCI.
