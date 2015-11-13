
//Class that handles click+mouse events on a canvas.
var CanvasClickerClass = function(){
	
	//Constants ================================================================//
	var _MOUSE_MOVE = "mousemove"; //mousemove event as recognized by javascript.
	var _CLICK = "click"; //click event as recognized by javascript.
	
	//Private Vars =============================================================//
	
	var _debug = null; //are we in debug mode? Set by constructor.
	
	var _self= null;
	var _has = false; //has canvas linked?
	var _nam = null;  //canvas name.
	var _can = null;  //canvas container. Use "can", "con" is like "context".
	var _ctx = null;  //canvas context.
	var _ass = null;  //asserter class. Checks for valid inputs.
	var _evt = null;  //event stored to avoid garbage collection.
	var _rec = null;  //canvas bounding rectangle.
	var _wid = null;  //canvas width cached.
	var _hig = null;  //canvas height cached.
	var _lft = null;  //_rec.left.
	var _top = null;  //_rec.top.
	var _rnd = Math.round;
	
	//Named "ex" + "yi" because "x & y" are too visually similar.
	var _ex = 0; //x position of mouse on canvas.
	var _yi = 0; //y position of mouse on canvas.
	
	//Sets the canvas by using the id of the canvas element in dom;
	this.setCanvasUsingNameID = function(canvas_name_id){
		_setCanvasUsingNameID_DEBUG_ENTER(canvas_name_id);
		
		//remove listener from possibly previous canvas.
		_remListener(); 
		
		//Link up canvas variables:
		_notEStr(canvas_name_id,"[canvas_name_id is empty string!]");
		_notNull(canvas_name_id,"[canvas_name_id is null]");
		_nam = canvas_name_id;
		_can = document.getElementById(canvas_name_id);
		_wid = _can.width;
		_hig = _can.height;
    _ctx = _can.getContext("2d");
		_has = true; //has a canvas linked to it!
		
		//Add listener to canvas:
		_addListener();
		
		_setCanvasUsingNameID_DEBUG_EXIT(canvas_name_id);
	};//FUNC::END
	
	//Private Functions ========================================================//
	
	//Execute any time the user moves mouse:
	function _onMouseMove(evt){
		_evt = evt;
		_storeMousePos();
		_onMouseMove_DEBUG_EXIT(evt);
	}
	
	//Store the current position of the user's mouse:
	function _storeMousePos(){
		_rec = _can.getBoundingClientRect();
		_lft = _rec.left; //optimize: less dot operator use.
		_top = _rec.top;  //optimize: less dot operator use.
		
		//http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
		_ex = _rnd((_evt.clientX-_lft)/(_rec.right -_lft)*_wid);
    _yi = _rnd((_evt.clientY-_top)/(_rec.bottom-_top)*_hig);
	}
	
	//Execute any time user clicks canvas:
	function _onClick(evt){
	  _log("canvas clicked!");
	}
	
	//Remove listener from canvas:
	function _remListener(){
		if(_has){ _can.removeEventListener(_MOUSE_MOVE, _onMouseMove); }
		if(_has){ _can.removeEventListener(_CLICK, _onClick); }
	}
	
	//Link existing canvas to event listener:
	function _addListener(){
		_addListener_DEBUG_ENTER();
		_can.addEventListener(_MOUSE_MOVE, _onMouseMove);
		_can.addEventListener(_CLICK, _onClick);
	}
	
	//Assert that input is not null:
	//arg: Input to check.
  //msg: Message to display if assert fails.
	function _notNull(arg,msg){
		_ass.assertNonNull(arg,msg);
	}//FUNC::END
	
	//Assert that input is true.
	//arg: Input to check.
  //msg: Message to display if assert fails.
	function _isTrue(arg,msg){
		_ass.assertTrue(arg,msg);
	}
	
	//Throws error if string is empty.
	//arg: Input to check.
  //msg: Message to display if assert fails.
	function _notEStr(arg,msg){
		_ass.assertNonEmptyString(arg,msg);
	}
	
	function _log(msg){
		console.log("CanvasClickerClass Says:"+ msg);
	}
	
	function _maybeConfigureDebugMode(){
		//Create an instance of debug object, to see if we are in debug mode:
		_debug = new DebugClass().isDebugMode;
	}
	
	//DEBUG CODE: DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD//
	function _setCanvasUsingNameID_DEBUG_ENTER(canvas_name_id){
		if(false===_debug){return;}
		//Keep permenant console log to know what is going on:
		var msg = "";
		msg += "CanvasClickerClass.setCanvasUsingNameID(";
		msg += canvas_name_id;
		msg += ");"
		_log(msg);
	}
	
	function _setCanvasUsingNameID_DEBUG_EXIT(canvas_name_id){
		//regardless of in debug mode or not, 
		//want to check for these non-nulls:
		_notNull(_wid, "[Canvas width is null!]" );
		_notNull(_hig, "[Canvas height is null!]");
		
		if(false===_debug){return;}
		_log("[Debug Fill!]");
		_ctx.rect(0,0,_can.width,_can.height);
		_ctx.fillStyle="red";
		_ctx.fill();
	}
	
	function _addListener_DEBUG_ENTER(){
		_isTrue(_has, "_has!==true, thus no canvas exists");
		_notNull(_can, "[canvas reference is null!]");
		_log("_addListener() called");
	}
	
	function _onMouseMove_DEBUG_EXIT(evt){
		if(_debug){
			console.log("_ex==" + _ex);
			console.log("_yi==" + _yi);
		}
	}
	
	
	//Constructor: Must be at bottom! ==========================================//
	function constructor(self){
		_self = self;
		_ass  = new AsserterBaseClass();
		
		_maybeConfigureDebugMode();
		
		
	}
	constructor(this);
	
	
}//FUNC::END