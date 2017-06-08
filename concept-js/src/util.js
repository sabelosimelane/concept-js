function Util() {
}

Util.prototype.enter = function (event, callback) {
    if (event.which == 13 || event.keyCode == 13) {
    	if (typeof(callback) == "function") {
    		callback();
    	}
    }
};

Util.prototype.initializeCheckboxes = function() {
	$('.i-checks').iCheck({
		checkboxClass : 'icheckbox_square-green',
		radioClass : 'iradio_square-green',
	});
};

Util.prototype.isEnterKey = function(key) {
	var e = key.which;
	if (e == 13)
		return true;
	return false;
};

Util.prototype.parseJSON = function(string){
    
	if (jQuery.type( string) == 'array'){
		string = JSON.stringify(string);
		console.log('stringifying...');
	}
	
	var temp = string.toString().replace(new RegExp('=', 'g'), ':');
 	var b = $.parseJSON( RJSON.transform(temp));
	return b;
};

(function($) {
	$.fn.serializeFormJSON = function() {

	   var o = {};
	   
	   var arrayElements = {};
	   this.find('select').each(function(){
		   if (this.multiple){
			   arrayElements[this.name] = this.value;
			   console.log(this.name);
		   }
	   });
	   
	   var a = this.serializeArray();
	   $.each(a, function() {

		   if (o[this.name]) {
	    	   if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else if(arrayElements[this.name]){
	    	   console.log('calling push...');
	    	   o[this.name] = [];
	    	   o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};
})(jQuery);