/* global describe before it expect */

var Browser = require("zombie");

describe("signin page", function () {
    before(function () {
		// initialize the browser
    	this.browser = new Browser({ site: "http://localhost:" + config.api.port });
	});

	// load the contact page
	before(function (done) {
		this.browser.visit("/", done);
	});

	it("should show signin form", function () {
		expect(this.browser.success).to.be.ok;
		expect(this.browser.text("button")).to.equal("Sign in");
		expect(this.browser.text("#inputUsername")).to.equal("");
	});
});