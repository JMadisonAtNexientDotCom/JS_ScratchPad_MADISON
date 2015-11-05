
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHH  HEADER HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//If we are in development, 
//the proxy will route to mock api using mock api handle.
//
//If we are are production, 
//the proxy will route to ACTUAL api using handle for live api.
//
//This should make it so switching from development to production is as
//simple as flipping a switch.
//@Author:JMadison@Nexient.com:2015.11.04(Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var AdapterIDs = function(){
	
	//The MOCK api that we make calls to when the live-api is not available.
	//Currently, the mock-api in the works for nexient-testing-service
	//will be using node.js and express.js, meaning it requires a localhost
	//node.js server to be running on your machine to work:
	this.MOCK_API    = 1;
	
	//The ACTUAL api for the project running on live server.
	//This is what we want to use when the final product is finished.
	this.LIVE_API    = 2;
	
	//A static mock api using require-js and angular.
	//If there is failiure to get MOCK_API up and running, this mock
	//does NOT require a localhost server.
	this.STATIC_API  = 3;

};//CLASS::END