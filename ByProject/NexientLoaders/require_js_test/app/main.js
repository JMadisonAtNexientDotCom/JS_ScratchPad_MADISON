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
        SINGLETON_03 = require('SUB_TRI_RENDERER');
		
		
		/*
		//CLASSES:
		require('Point2DClass');
		require('Tri2DClass');
		require('TriQuadClass');
		
		//SINGLETONS:
    require('LOOPAPP'); //in lib folder
		require('SUB_TRI_BUILDER');
		require('SUB_TRI_RENDERER');
		*/
		
		/*
		console.log("LOG LOOPAPP:START");
		console.log(LOOPAPP);
		console.log("LOG LOOPAPP:END");
		LOOPAPP.guts._hasFunc= false;
		//LOOPAPP.guts.wrapper();
		var hey = "hey";
		var heys= 0;
		var somefunc = function(){
		 console.log(hey); 
		 hey += "hey";
		 heys = heys + 1;
		 console.log(heys);
		 if(heys > 3){
			 hey = "bye";
			 heys = 0;
		 }
		}
		
		var otherfunc = function(){
			console.log("otherFunc");
		}
		
		LOOPAPP.guts.start( [somefunc,otherfunc] );
		setInterval(LOOPAPP.guts.toggle, 2000);
		*/
		
		//attempt circle ball:
		var cpath = new CirclePathPointClass();
		cpath.org.x = 50;
		cpath.org.y = 50;
		cpath.speed = 0.5;
		cpath.rad = 5;
		cpath.next_frame();
		
		var tri = new Tri2DClass();
		tri.set_v0(50,10);
		tri.set_v1(100,100);
		tri.set_v2(0,100);

		//tri.set_v0(0,10);
		//tri.set_v1(200,100);
		//tri.set_v2(0,100);
		//SUB_TRI_RENDERER.draw_tri(tri);

		SUB_TRI_BUILDER.tri_temp = tri; //set the template to sub-divide.


		//DEBUG:
		//How is the SUB_TRI_BUILDER.tri_temp. not being populated after assigning?
		if(tri.p1.x != 100){
			console.log("super how???");
		}
		if(SUB_TRI_BUILDER.tri_temp.p1.x != 100){
			console.log("howww???");
		}//


		SUB_TRI_BUILDER.num_levels_deep = 5;
		SUB_TRI_BUILDER.use_sub0 = false;
		SUB_TRI_BUILDER.use_sub3 = true;
		
		var sub0_seed = 1;
		var sub1_seed = 1;
		var sub2_seed = 1;
		var sub3_seed = 1;
		
		var sub0_mask = (1 << 0);
		var sub1_mask = (1 << 1);
		var sub2_mask = (1 << 2);
		var sub3_mask = (1 << 3);
		
		var seed_combo = 0;
		
		//Callback referencing itself doesn't have much luck...
		//Make endless chain of building:
		var quad;
		var callback = function(){
			
			
			SUB_TRI_RENDERER.draw_quad(quad);
			
			seed_combo++;
			if(seed_combo > 16){seed_combo = 0;} //16 max combinations with 4 bits.
			sub0_seed = seed_combo & sub0_mask;
			sub1_seed = seed_combo & sub1_mask;
			sub2_seed = seed_combo & sub2_mask;
			sub3_seed = seed_combo & sub3_mask;
			
			SUB_TRI_BUILDER.use_sub0 = ( sub0_seed>0 );
			SUB_TRI_BUILDER.use_sub1 = ( sub1_seed>0 );
			SUB_TRI_BUILDER.use_sub2 = ( sub2_seed>0 );
			SUB_TRI_BUILDER.use_sub3 = ( sub3_seed>0 );
			
			//sub0_seed+=1;
			//sub1_seed+=1;
			//sub2_seed+=1;
			//sub3_seed+=1;
			//SUB_TRI_BUILDER.use_sub0 = ( (sub0_seed%2)>0 );
			//SUB_TRI_BUILDER.use_sub1 = ( (sub1_seed%3)>0 );
			//SUB_TRI_BUILDER.use_sub2 = ( (sub2_seed%4)>0 );
			//SUB_TRI_BUILDER.use_sub3 = ( (sub3_seed%5)>0 );
			
			//SUB_TRI_BUILDER.use_sub0 = true;
			quad = SUB_TRI_BUILDER.build();
		};
		SUB_TRI_BUILDER.set_on_built_callback( callback );
		
		//LOOPAPP.guts.start(SUB_TRI_BUILDER.build);
	 
		
		var quad = SUB_TRI_BUILDER.build();

		console.log("[quadstart:]");
		console.log(quad);
		console.log("[quadend:]");
		SUB_TRI_RENDERER.draw_quad(quad);
		console.log( "num_levels_deep==" + SUB_TRI_BUILDER.num_levels_deep );
		
		
		
});