# Testing 
This is a nascent capability to add automated testing to the platform.

## Packages
The following packages are used for running various typse of tests within the platform
	- [mocha](https://mochajs.org/): a feature-rich JavaScript test framework running on Node.js and the browser
	- [chai](http://chaijs.com/): a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework
		- [chai-http](http://chaijs.com/plugins/chai-http): HTTP integration testing with Chai assertions.
		- [chai-as-promised](chai-as-promised): extends Chai with a fluent language for asserting facts about promises.
	- [Zombie](http://zombie.js.org/): fast, full-stack, headless browser testing using node.js

## Running
With npm:
- to run all the tests once:
	npm test  	

- to run a the mocha test with a switch, e.g., --grep "something"	
		npm test -- --grep "test_description"
	
- on a running docker container
		docker exec -i container_name npm test	
	or
		docker exec -i container_name npm test -- -g "test_description"		

for the command line usage and the list of available switches in mocha refrer to https://mochajs.org/#usage
 
## Runtime setup
Several things affect mocha's setup. Here are the highlights:

* `test/mocha.opts`: this file is read as command-line argument defaults
* `test/setup.js`: this defines hooks (before and after) which are attached to to root test suite (i.e. not in a specific describe block)
* `test/common.js`: This is loaded because of a line in mocha.opts, this script also set up some globall available variables (by assigning to global.*)