
//The instances singleton. Like MasterRegistry_Constants.js,
//but stores instantiated data that needs to be shared amongst classes.
//
//(Technically, MasterRegistry_Constants.js also stores instantiated data)
//(But we are pretending master registry constant's data is immutable.   )
//
var MasterRegistry_Utilities = function(){

	this.asserter   = new AsserterClass();

  return this;
};//CLASS::END