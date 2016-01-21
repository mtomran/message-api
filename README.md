# Messageing RESTful API
A simple RESTful API and web application to acomplish 
trivial messaging operations 
such as submitting, viewing, and deleting messages.


## Application URL
The application can be accessed from this [link](http://node.message-api.mtomran2.svc.tutum.io/).

## Using the application
Go to the application [login](http://node.message-api.mtomran2.svc.tutum.io/) page. 

Use the master login (username: admin, password: secret) or an existing username/password 
to login to the platform. 

Users can submit a new message by filling the title and content box and pressing the send button.
The new message would show in the list immediately.
The user can then view more information or delete each message using the provided buttons on each message.
Message view provides information about the user and the time message has been posted. 
It also showes whether or not the content of the message is polindrome.

The right panel shows the list of availablle users. 
All users have permission to create new users by pressing the "add new user" button and providing the
required information. 

They also can delete other users except the 'admin' user using the button on each user item in the list. 

The 'Logout' button logs the user out of the platform and takes them to the login page. 

## Repository
The application source code is on GitHub and is accessible at
https://github.com/mtomran/message-api


## Core Technologies
The core technologies used in this application are the following.

### MongoDB
The data source for storing users and messages.

### Node.js
Node.js, along with Express package, is used as a RESTful API/Web Server. 

### Angular.js and Bootstrap
Used for building the front-end GUI of the application.


## Continuous Integration/Deployment Technologies
The follwoing process is used to deploy the application from the development environment 
to the production server:
	
	Development → GitHub → CircleCI → Docker Hub → Tutum → Production (AWS)

The whole process is automated and would trigger when code is pushed the 'master' branch branch on GitHub. 
For more info about the process vist this [link](http://blog.tutum.co/2015/06/10/node-js-and-continuous-deployment-with-circleci-docker-hub-and-tutum/).  

### CircleCI
A tool to automate build, test & deployment for public & private projects. We are using CircleCI 
for building and testing the project. Each successful push to the 'master' branch triggers a build 
and runs the tests. Upon a successful build and when all tests pass, a new docker build process is 
triggered on DockerHub repository which then builds a fresh docker image.

### Docker Hub
A cloud-based registery of docker container images. We use docker hub to automate the deployment pipeline.
Upon a successful build and when all tests are passed, the CircleCI service, teriggers a new build on DockerHub
which then builds a new docker image and triggers the Tutum service to re-deploy into the productio server.

### Tutum
A Docker platform for building and deploying docker-based applications. Tutum has the ability to connect to
different Linux host/VMs including AWS which we use to host the application.
A successful image build on DockerHub triggers the Tutum service to re-deploy 
the application into the procuction server. 


### AWS
Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services. 
We are using the free tier computing resources to serve as the production server and host the application.
 