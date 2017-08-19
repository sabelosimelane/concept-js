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

Util.prototype.getParms = function() {

	  // get query string from url (optional) or window
	  var queryString = window.location.search.slice(1);

	  // we'll store the parameters here
	  var obj = {};

	  // if query string exists
	  if (queryString) {

	    // stuff after # is not part of query string, so get rid of it
	    queryString = queryString.split('#')[0];

	    // split our query string into its component parts
	    var arr = queryString.split('&');

	    for (var i=0; i<arr.length; i++) {
	      // separate the keys and the values
	      var a = arr[i].split('=');

	      // in case params look like: list[]=thing1&list[]=thing2
	      var paramNum = undefined;
	      var paramName = a[0].replace(/\[\d*\]/, function(v) {
	        paramNum = v.slice(1,-1);
	        return '';
	      });

	      // set parameter value (use 'true' if empty)
	      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

	      // (optional) keep case consistent
	      paramName = paramName.toLowerCase();
	      paramValue = paramValue.toLowerCase();

	      // if parameter name already exists
	      if (obj[paramName]) {
	        // convert value to array (if still string)
	        if (typeof obj[paramName] === 'string') {
	          obj[paramName] = [obj[paramName]];
	        }
	        // if no array index number specified...
	        if (typeof paramNum === 'undefined') {
	          // put the value on the end of the array
	          obj[paramName].push(paramValue);
	        }
	        // if array index number specified...
	        else {
	          // put the value at that index number
	          obj[paramName][paramNum] = paramValue;
	        }
	      }
	      // if param name doesn't exist yet, set it
	      else {
	        obj[paramName] = paramValue;
	      }
	    }
	  }

	  return obj;
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
	   var disabled = $(this).find('input:disabled');
	   
	   disabled.each(function(){
		   a.push($(this)[0]);
	   });
	   
	   $.each(a, function() {

		   if (o[this.name] && this.name != 'nav') {
	    	   if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else if(arrayElements[this.name]){
	    	   console.log('calling push...');
	    	   o[this.name] = [];
	    	   o[this.name].push(this.value.trim() || '');
	       } else {
	           if (this.value.trim()){
	        	   o[this.name] = this.value.trim();
	           }
	       }
	   });
	   return o;
	};
})(jQuery);