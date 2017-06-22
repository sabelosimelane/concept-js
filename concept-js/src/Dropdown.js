/**** Extends Chosen Plugin Dropbox  ******/

jQuery.fn.extend({
	
	addoption : function(value, description, update){
		var instance = this;
		$(instance).append('<option value="'+ value +'">'+ description +'</option>');
		if (update) $(instance).trigger("chosen:updated");
		return instance;
	},
	
	setval : function(value){
		var instance = this;
		$(instance).val(value).trigger("chosen:updated");
		return instance;
	}
});


(function ( $ ) {
	 
    $.fn.greenify = function() {
        this.css( "color", "green" );
        return this;
    };
 
}( jQuery ));