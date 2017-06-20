jQuery.fn.extend({
	addoption : function(value, description){
		var instance = this;
		$(instance).append('<option value="'+ value +'">'+ description +'</option>');
		$(instance).trigger("chosen:updated");
		return instance;
	},
	
	setval : function(value){
		var instance = this;
		$(instance).val(value).trigger("chosen:updated");
		return instance;
	}
});