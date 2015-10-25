
//Refactoring out the permutation based rendering
//from SUB_TRI_RENDERER into here.
var SUB_TRI_REN_PERMUTE = function(ARG_sub_tri_renderer){

  //Workhorse renderer object:
  this.sub_tri_renderer = ARG_sub_tri_renderer;

  //PUBLIC:
	this.draw_tri = function(tri){
	  this.sub_tri_renderer.draw_tri(tri);
	};//
	
	this.clear_linked_canvas = function(){
		this.sub_tri_renderer.clear_linked_canvas();
	};//


  //PRIVATE:
	var _permuter        = new PermuterClass();
	var _permu_quad_root = {}; //TriQuadClass that is being rendered via permutations.

  //NOTE: needs to take the PERMU_QUAD_ROOT as arg because of scope issues.
	//Hack: When checking to see if permutation is valid,
	//      if it is, we automatically draw the triangle.
	//PRIVATE METHOD:
	//CONVENTION: _this context LAST in case we want it to be null.
	var _permutation_valid_check = function(stack, _this){
		
		var quad = _permu_quad_root;
		
		if (typeof quad === "undefined"){ 
			console.log("SUB_TRI_RENDERER.JS :ERROR:ABC231232DEF");
		}//ERROR CHECK.
		
		var results_arr = _this.query_using_permutation_stack(quad,stack);  //<<<<<<<<<<<<<<<better
		var was_stack_a_valid_permutation = results_arr[0];
		if(was_stack_a_valid_permutation === true){
			_this.draw_tri( results_arr[1] ); //2nd argument is the tri we can draw.
		}
		
		//DONT FORGET TO RETURN RESULT!
		return was_stack_a_valid_permutation;
		
	};
	
	//Traverse the tree non-recursively in this call and draw the next
	//triangle of the permutation sequence:
	//PUBLIC METHOD:
	this.draw_next_permutation = function(quad){
		
		//error check:
		if (typeof quad === "undefined"){ console.log("SUB_TRI_RENDERER.JS :2423");}
		
		//Set the root object that is being rendered via permutations:
		_permu_quad_root = quad;
		if (typeof _permu_quad_root === "undefined"){ 
			console.log("SUB_TRI_RENDERER.JS : [JD342DKS]");
		}//
		
		//Hack: I don't know how to make constructor, so just wire
		//      the permuter up each time you want to use it:
		_permuter.setPathCheckFunc(_permutation_valid_check, this);
		
		//Will goto next permutation if exists. And draw it if exists.
		_permuter.goto_next_permutation();
	};
	
	//Reset the object that is tracking the permutations.
	//PUBLIC METHOD:
	this.reset_permutation_tracker = function(){
		_permuter.reset_permutations();
	};
	
	//cuwad: "cuwad" is bastardized version of "quad" to attempt to avoid
	//        namespace collisions that may be causing errors in my code.
	//quad == TriQuadClass to query.
	//
	//stack == Array specifying permutation stack: Ex: [0,1,1,0]
	//         Think of it as a generic dot operator address.
	//RETURNS: ARRAY WITH TWO POSITIONS.
	//         ARRAY[0] = true/false if permutation can be resolved.
	//         ARRAY[1] = the main triangle taken from the permutation endpoint
	//                    in quad if the permutation exists. Else it is empty obj.
	this.query_using_permutation_stack = function(cuwad, stack){
		
		//error check:
		if (typeof cuwad=== "undefined"){ console.log("SUB_TRI_BUILDER.JS :2423");}
		if (typeof stack=== "undefined"){ console.log("SUB_TRI_BUILDER.JS :8829");}
		
		var op = [false,{}];
	  var level = (-1);
		var address_index = 0;
		var possible_output_tri = {};
		var found = (-777); //<--negatives for false.
		while(true){
			
			//DEBUG:
			if (typeof cuwad === "undefined"){ 
			console.log("SUB_TRI_BUILDER.JS :sdfsfasfda");
			}//
			
			//move to next coord on stack:
			level++; //<--first used value should be ZERO.
			if(level >= stack.length){break;}
			
			//set found to false each iteration.
			//but AFTER the bail out. 
			found = (-888);//FALSE
			
			//Tried making hack an intermediate set to null. Did not work.
			//My next try? TWO LOCAL VARIABLES. And using numbers as booleans.
			var HACK = 0; //hack hack
			var ZERO = 0; //hack zero.
			var ONE  = 1; //hack one.
			
			//See if our next "dot operator" (address_index) can be
			//resolved to a node further down the quad tree:
			address_index = stack[level];
			if(0 === address_index){
				
				//debug:
				//console.log("cuwad.has0 BEFORE ASSIGNMENT === " + cuwad.has0);
				HACK = cuwad.has0 + 0; //<--Try +0 so HACK assigned correct value.
				//console.log("cuwad.has0 AFTER ASSIGNMENT === " + cuwad.has0);
				
				if(HACK >= ONE){//TRUE
				  possible_output_tri = cuwad.sub0.main; //BEFORE LINK-LIST JUMP!!!
				  cuwad = cuwad.sub0; //<----------------//Linked list jump.
					found=(200);//TRUE
				}
			}else
		  if(1 === address_index){
				HACK = cuwad.has1 + 0;
				if(HACK >= ONE){//TRUE
				  possible_output_tri = cuwad.sub1.main; //BEFORE LINK-LIST JUMP!!!
				  cuwad = cuwad.sub1; //<----------------//Linked list jump.
					found=(201);//TRUE
				}
			}else
			if(2 === address_index){
				HACK = cuwad.has2 + 0;
				if(HACK >= ONE){//TRUE
				  possible_output_tri = cuwad.sub2.main; //BEFORE LINKED-LIST JUMP!!!
				  cuwad = cuwad.sub2; //<----------------//Linked list jump.
				  found=(202);//TRUE
			  }
			}else
			if(3 === address_index){
				HACK = cuwad.has3 + 0;
				if(HACK >= ONE){//TRUE
			   	possible_output_tri = cuwad.sub3.main; //BEFORE LINKED-LIST JUMP!!!
				  cuwad = cuwad.sub3; //<----------------//Linked list jump.
					found=(203);//TRUE
			  }
			}else{
			  //do nothing. bad permutation value. Likely overflow.
				//This is okay. We will just be returning false.
				break;
			}
			
			//DEBUG:
			if (typeof cuwad === "undefined"){ 
			  console.log("SUB_TRI_BUILDER.JS :sdfsfasfda");
			}//
				
		}//INF LOOP
		
		//if path was able to be fully resolved, then
		//return true with the triangle (NOT QUAD) that could be rendered.
		//-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f
		var wasFound = false;
		wasFound = (found >= 1);
		if(wasFound){ 
			//Create output:
		  op = [true, possible_output_tri];
			
			//Test that output is correct:
		  if (typeof possible_output_tri === "undefined"){ 
				console.log("ERROR:wasFound===true, but tri is undefined");
			}//
		}//was found? //-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f
		
		//RETURN THE OUTPUT:
		return op;
		
	};//queryUsingPermutationStack

};