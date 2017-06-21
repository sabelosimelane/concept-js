var context;
var root;

function Navigator(){
	if (!context || !root)
		alert('You need to set the root="/Application/" and context="/Application/Controller". Set this in the js global scope!');
	
	this.ctx = root;
	this.url = context;
	this.LANDING_PAGE = 'index.jsp';
}

Navigator.prototype.loadJSP = function(path, callback){
	var parms = {};
	$.post(path, parms, function(xml) {
		if (typeof(callback) == "function") {
			callback(xml);
		}
    });
}

Navigator.prototype.call = function(url, json, successCB, errorCB){
	new Message().clearErrors();
	
	if (json && url){
		json.nav = url;
		json = JSON.stringify(json);
	} else if (!json){
		var payload = {};
		payload.nav = url;
		json = JSON.stringify(payload);
	}
	
	new Navigator().callAjax(this.url, json, successCB, errorCB);
	
};

Navigator.prototype.submit = function(action, form, exParms, successCB, errorCB){
	if ($(form).find("#nav").size() == 0){
		$(form).append('<input id="nav" name="nav" type="hidden" value="'+ action +'">');
	}
	$(form).find("#action").val(action);
	
	var parms =  $( form ).serializeFormJSON();
	if (exParms){
		$.extend(parms, exParms);
	}

	var json = JSON.stringify(parms);
	
	//delete (parms.nav);
	new Navigator().callAjax(this.url, json, successCB, errorCB);
};

Navigator.prototype.callAjax = function(url, json, successCB, errorCB){
	
	$.ajax({
		   url: this.url,
		   type: "POST",
		   contentType: "application/json",
		   data: json
		}).done(function(data, textStatus, jqXHR){
			if (!$.isPlainObject( data)){
				console.log('passing html...');
				data = $.parseHTML(data, true);
			} else {
				console.log('object not plain object...');
				data = data.data;
			}
			if (typeof(successCB) == "function") successCB(data);
		}).fail(function(jqXHR, textStatus, errorThrown){
			if (jqXHR.responseText.indexOf("Unauthorized (401)") !== -1) {
				window.location = new Navigator().ctx; 
			} else {
				var response = $.parseJSON(jqXHR.responseText);
				var message = new Message();
				message.handleError(response);
				if (typeof(errorCB) == "function") errorCB(response);
			}
		});
}
