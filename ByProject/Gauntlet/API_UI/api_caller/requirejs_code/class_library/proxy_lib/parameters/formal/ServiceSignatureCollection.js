
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//Holds multiple ServiceSignature instances.
//ApiCallerClass and our proxy use this object to 
//know what service calls should be available for calling.
//@Author: JMadison@Nexient.com: 2015.11.04_0642PM(Nov4th,Year2015);
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var ServiceSignatureCollection = function(){
	
	var _sigs = []; //array of ServiceSignature.js instances.

	//sig: An instance of ServiceSignature that 
	//     we want to add to our collection of signatures.
  this.push = function(sig){
		
		//Do error checking before we push to collection:
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertIsServiceSignature(sig,"[sig is not of correct type]");
		checkForCollisions(sig);
		
		//Add to collection of parameters:
		_sigs.push( sig );
		
	};//FUNC::END
	
	//Returns true if no items found in our collection of signatures:
	this.isEmpty = function(){
		if(_sigs.length <= 0){ return true;}
		return false;
	};//FUNC::END
	
	this.size = function(){
		return _sigs.length;
	};//FUNC::END
	
	//Check to make sure an identical parameter does NOT exist.
	//The complexity of this is a bit high. But it is only done during
	//Setup/Initialization. So I think the benifits of robust error check
	//outweigh the costs.
	function checkForCollisions(sig){
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertNonNull(_sigs, "[_sigs are null]"); //can be empty, but not null.
		
		//We only care about .id and .about.
		//Both of those should be UNIQUE.
		var cur_sig = null;
		for(var i = 0; i < _sigs.length; i++){
			
			cur_sig = _sigs[i];
			ac.assertNonNull(cur_sig, "[cur_sig found to be null]");
			
		  //Identical formal parameter signatures are OKAY, however, identical
			//main handles are NOT okay because they identify the actual function
			//being called:
			if(cur_sig.main_handle.id ===    //Indentation so we can get
			       sig.main_handle.id){      //visual confirmation of line-up.
			  doError("[.id collision in signature collection.]");
			}//
			
			if(cur_sig.main_handle.about === //Indentation so we can get
			       sig.main_handle.about){   //visual confirmation of line-up.
			  doError("[.about collision in signature collection.]");
			}//
			
		}//next i.
	};//FUNC::END
	
	//Throw an error from this class:
	function doError(msg){
		var err_msg = "";
		err_msg += "[Error inside ServiceSignatureCollection.js]";
		err_msg += "[CAUSE:]"
		err_msg += msg;
		throw msg;
	}//FUNC::END

};//FUNC::END