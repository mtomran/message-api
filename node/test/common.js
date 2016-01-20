"use strict";

// load required modules
// By assigning to the `global` variable, these properties will be in available to all tests

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var bluebird = require("bluebird");
var chaiHttp = require("chai-http");

global.expect = chai.expect;
global.Promise = bluebird;
global.chai = chai;
global.config = require("../config.js");

chai.use(chaiAsPromised);
chai.use(chaiHttp);

