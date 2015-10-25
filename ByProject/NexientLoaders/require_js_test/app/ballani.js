define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
		
		//http://www.ericfeminella.com/blog/2012/05/17/organizing-require-js-dependencies/
		//CLASSES:
		var CLASS_01 = require('Point2DClass'), 
        CLASS_02 = require('Tri2DClass'),  
        CLASS_03 = require('TriQuadClass'),  
	      CLASS_04 = require('CirclePathPointClass'),
				CLASS_05 = require('PermuterClass'),
	  //SINGLETONS:
        SINGLETON_01 = require('LOOPAPP'),  
        SINGLETON_02 = require('SUB_TRI_BUILDER'),  
        SINGLETON_03 = require('SUB_TRI_RENDERER'),
				SINGLETON_04 = require('POINT_RENDERER'),
				SINGLETON_05 = require('POINT_ON_PATH_RENDERER');
		

		//attempt circle ball:
		console.log("we are here");
		var cpath = new CirclePathPointClass();
		cpath.org.x = 50;
		cpath.org.y = 50;
		cpath.amt = 0.08; //amount in percentage to move per frame.
		cpath.rad   = 15;
		cpath.next_frame();
		POINT_ON_PATH_RENDERER.draw_path_point(cpath);
		
		var nextAndRender = function(){
			cpath.next_frame();
		  POINT_ON_PATH_RENDERER.draw_path_point(cpath);
		};//
		
		LOOPAPP.guts.start(nextAndRender);

		
		
});