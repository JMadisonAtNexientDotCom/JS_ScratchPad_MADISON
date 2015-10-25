var StackClass = function(){
	
//GROWING: Growing will push a [0] at the end of the stack.
//         If the stack is analysed and we realize the current stack path
//         leads nowhere, we PRUNE the stack.
//
//         Growing after pruning will INCRIMENT the value at the current
//         pointer position. (Which should be the end of the stack)
//         Because it already tried to push a [0] onto the end and that was
//         found to be invalid.
//
//PRUNING: Pruning will pop a [#] off the end of the stack.
//         This could be a [0] from trying a dead end, or the current level
//         of the stack may have been maxed out. 
//         AKA: [0][1][2][MAX_USABLE_INDEX]
//         Either way, the last level needs to be popped off, and we
//         need to flag as having reached a dead end so we grow properly
//         the next iteration.
//
//When to prune and when to grow?
//Outside the scope of this class.
//Another function should be looking at this objects stack and
//PRUNING it if found to be bogus, or GROWING it if found to be valid.
//
////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//	      [0][0][0][X]                                                        //
//	          DEAD_END    [NEVER TRIED]                                       //
//	             X         |                                                  //
//	             |         |                                                  //
//	             +---------+                                                  //
//	                  |                                                       //
//	                  |                                                       //
//					 [0][0][0]+   +[0][1][1]   [0][1][0]+   +[1][1][1]                //
//										|   |                     |   |                         //
//										|   |                     |   |                         //
//							[0][0]+---+[0][1]         [1][0]+---+[1][1]                   //
//											|                         |                           //
//											|                         |                           //
//									 [0]+-------------------------+[1]                        //
//																	 |                                        //
//																	[ ]EMPTY                                  //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////                       
	
	//Design choice: 
	//Going with python style "private by convention".
	//There is a way called "Private Prototype Functions" to make a private
	//Container that can be accessed by instance methods in your function...
	//But I decided to keep it simple for now. Don't want to be doing two
	//learning experiments at the same time.
	
	this._stack = [];   //Empty array represents _stack address of ROOT object.
	this._ptr   = (-1); //pointer rests on where you want to grow from.
	//Lets us know not to grow by pushing a [0] onto the stack, because
	//that path is a dead-end, known from previous experience.
	this._just_pruned = false;
	
	//Attempts to find next iteration in stack:
  this.grow = function(){
		
		if(this._primed){
			//no growing, just was primed for smooth entry
			//into an iteration loop. Now we can use isEmpty() to validate
			//if stack is spent or not without any trouble.
		  this._primed = false;
		}else
		if(this._just_pruned){
			//Try finding next branch by incrementing
			//value at current depth/level.
		  this._stack[this._stack.length-1]++;
			this._just_pruned = false;
			this._primed      = false;
		}else{
			//Try finding next branch by
			//pushing on a new level:
			this._stack.push(0); //<--pushing is OKAY.
		  this._ptr++;
		}// 
	};
	
	//Simulates a prune without actually pruning, so we can skip over
	//non-existent branches without changing current node position:
	this.forceNextGrowToIncrimentValueAtCurrentLevel = function(){
		this._just_pruned = true;
	};
	
	//Prunes off a level that was found to be invalid:
	this.prune = function(){
		if(this._ptr <= (-1)){console.log("StackClass.js::ERROR:NothingToPop");}
		this._stack.pop();
		this._ptr--;
		this._just_pruned = true;
	};
	
	//Clears the stack to the root.
	this._clear = function(){
		this._stack = [];
		this._ptr   = (-1);
		this._just_pruned = false;
	};//
	
	//When primed, invoking the grow() method will only
	//turn ._primed to false. We have this setup for priming
	this.prime = function(){
		this._clear();
		this._stack = [0];
		this._ptr   =  1;
		this._primed = true;
	};//
	
	this.isEmpty = function(){
	  return (this._stack.length <= 0);
	};//
	
	this.getStackArray = function(){
		return this._stack;
	};//
	
	//Returns the index that is at last level of stack:
	this.getIndexAtLastLevelOfStack = function(){
		return this._stack[this._stack.length - 1];
  };
	

}//CLASS::END