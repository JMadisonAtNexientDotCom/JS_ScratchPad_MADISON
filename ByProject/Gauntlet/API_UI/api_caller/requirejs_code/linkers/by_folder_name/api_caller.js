requirejs.config({
    baseUrl: 'requirejs_code/class_library',
		
		//paths not needed:
    paths: {
       app_rel_path: '../app_library'
    }
});

//Load EVERYTHING:
requirejs(['app_rel_path/ALL_CLASSES']);