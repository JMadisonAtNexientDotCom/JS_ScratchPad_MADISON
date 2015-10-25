define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
		
		//http://www.ericfeminella.com/blog/2012/05/17/organizing-require-js-dependencies/
		//PRIMITIVE CLASSES:
		
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
        
        
	  //This will eventually become guts of NEXIENT_LOADER class,
		//so mock up our constructor:
		var canvas_container = document.getElementById('myCanvas');
		
		//create a parallelogram with the two triangles:
		var para_builder = new ITALIC_PARALLELOGRAM_BUILDER();
		para_builder.rect_wid       = canvas_container.width;
		para_builder.rect_hig       = canvas_container.height;
		para_builder.italic_percent = (1/3);
		var para = para_builder.build();
		
		var tri0 = para.tri0;
		var tri1 = para.tri1;
		
		var quad0 = null;
	  var quad1 = null;
		
		//var tri = new Tri2DClass();
		//tri.set_v0(50,10);
		//tri.set_v1(100,100);
		//tri.set_v2(0,100);


    //construct fractal:
		var builder = new SUB_TRI_BUILDER();
		
		//NOTE: Permuter class currently expects there to be no
		//      missing branches in the quad tree. If there are,
		//      the program will crash on you, or fail to work.
		//      The fix for this is too much of a performance hit
		//      to implement.
		//Build LEFT tri-quad: ------------------------------+ 
		builder.tri_temp = tri0;     //<---Use tri0          | 
		builder.num_levels_deep = 3; //                      | 
		builder.use_sub0 =  true;    //                      | 
		builder.use_sub1 =  true;    //                      | 
		builder.use_sub2 =  true;    //                      |
	  builder.use_sub3 =  true;    //                      |
		quad0 = builder.build();     //<---Assign to quad0   |
		                             //                      |
		//Build RIGHT tri-quad:      //                      |
		builder.tri_temp = tri1;     //<---Use tri1          |
		builder.num_levels_deep = 3; //                      |
		builder.use_sub0 =  true;    //                      |
		builder.use_sub1 =  true;    //                      |
		builder.use_sub2 =  true;    //                      |
	  builder.use_sub3 =  true;    //                      |
		quad1 = builder.build();     //<---Assign to quad1   |
		//---------------------------------------------------+
		
		
		//create nexient polygon using parallelogram:
		var nex_maker = new NEXIENT_LOGO_POLYGON_BUILDER();
    nex_maker.template_parallelogram = para;
    var poly = nex_maker.build();		
    //poly.draw(canvas_container);
		
		
		var ren = new SUB_TRI_RENDERER();
		//ren.draw_quad(quad0);
		
		//create a filter object:
		var filter = new CanvasKnockBackerFilterClass();
		filter.alpha_multiplier = 0.8;
		
		//clear and draw one permutation:
		var permu_ren0 = new SUB_TRI_REN_PERMUTE(ren);
		var permu_ren1 = new SUB_TRI_REN_PERMUTE(ren);
		permu_ren0.reset_permutation_tracker();
		permu_ren1.reset_permutation_tracker();
		var doPermuteDraw = function(){
		  //permu_ren.clear_linked_canvas();
			
			//draw polygon:
			//canvas_container.getContext('2d').globalCompositeOperation = 'destination-over'; //DRAW NEW PIXELS BELOW.
			//canvas_container.getContext('2d').globalCompositeOperation = "overlay";
	    //poly.draw(canvas_container);
			//canvas_container.getContext('2d').globalCompositeOperation = 'source-over'; //DRAW NEW PIXELS ABOVE.
			
			
			
			//draw more of shape:
			//if(do0 === true){
				//fade clear:
			  filter.doFilter(canvas_container);
		    permu_ren0.draw_next_permutation(quad0);
			//}else{
			  permu_ren1.draw_next_permutation(quad1);
			//};//
			do0 = (!do0);
			
			//Give some time, then do again.
			setTimeout(doPermuteDraw,60); //240
		};//
		
		var do0 = true;
		canvas_container.getContext('2d').globalCompositeOperation = 'add';
		doPermuteDraw();
		
		//poly.draw(canvas_container);
		
		
		
		
		
		
		
		
});