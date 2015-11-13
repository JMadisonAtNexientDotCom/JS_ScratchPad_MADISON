// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'madison_lib',
		
		//paths not needed:
    //paths: {
    //    madison_app: '../madison_app'
    //}
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['madison_app/NexiFlakesApp']);