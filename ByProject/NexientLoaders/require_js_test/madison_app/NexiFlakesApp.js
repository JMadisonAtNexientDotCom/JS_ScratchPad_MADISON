
define(function (require) {
    
		//Load all dependencies,
		//Keep dependency loading OUTSIDE of the app container class you want
		//to return;
		
		//BASIC REQUIREMENTS, that even primitives with "no dependencies" need.
		//Think of it as Madison's standard library.
		var BASIC_UTIL_01 = require("AsserterBaseClass"),
		    BASIC_UTIL_02 = require("DebugClass"),
	  //PRIMITIVE CLASSES:
				PRIM_01 = require("CanvasClickerClass");
		
		/*
		//PRIMITIVE CLASSES (No dependencies)
		var PRIM_01 = require('Point2DClass'                   ), 
				PRIM_02 = require('StackClass'                     ), 
				PRIM_03 = require('CanvasKnockBackerFilterClass'   ),
		//COMPOUND PRIMITIVES (Have dependencies)
				COMP_01 = require('Tri2DClass'                     ),  
				COMP_02 = require('Parallelogram2DClass'           ),
				COMP_03 = require('TriQuadClass'                   ),  
				COMP_04 = require('CirclePathPointClass'           ),
				COMP_05 = require('PermuterClass'                  ),
				COMP_06 = require('PointNormalSegment2DClass'      ),
				COMP_07 = require('Polygon2DClass'                 ),
				
		//MAKER CLASSES: Holds constructors for primitives and
									 //compound primitives:
				MAKER_01 = require('POINT_NORM_SEG_MAKER'          ),
		//BUILDER CLASSES:
				BUILDER_01 = require('SUB_TRI_BUILDER'             ),
				BUILDER_02 = require('SUB_TRI_RENDERER'            ),
				BUILDER_03 = require('ITALIC_PARALLELOGRAM_BUILDER'),
				BUILDER_04 = require('NEXIENT_LOGO_POLYGON_BUILDER'),
		//OTHER CLASSES WITH DEPENDENCIES:
				OTHER_01 = require('SUB_TRI_REN_PERMUTE'           ),
				OTHER_02 = require('NEXIENT_LOADER'                ),
		//SINGLETONS:
				SINGLETON_01 = require('LOOPAPP'); //<<semicolon on last item. 
		*/
		
		var NexiFlakesApp = function(){
		
		  var _canvas_clicker = new CanvasClickerClass();
			
			this.setCanvasUsingNameID = function(canvas_name_id){
				
				//Log what is happening:
				var msg = "";
		    msg += "NexiFlakesApp.setCanvasUsingNameID(";
		    msg += canvas_name_id;
		    msg += ");"
				_log(msg);
				
				//Logic!
				_canvas_clicker.setCanvasUsingNameID(canvas_name_id);
			}
		
		  //Test function just to see that app exists.
		  this.ping = function(){
				console.log("NexiFlakesApp.js pinged!");
		  };//FUNC::END
			
			function _log(msg){
				console.log("NexiFlakesApp Says:"+ msg);
			}
		
		
			return this; //return the [application container class / self]
		};//CLASS::END
		
		return new NexiFlakesApp();
		
});//DEFINE END: