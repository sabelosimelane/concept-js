function Message(messageHideInterval, positionClass) {
	this.messageHideInterval = messageHideInterval || 5000;
	this.positionClass = positionClass || 'toast-top-right';
}

Message.prototype.showMessage = function(msg, config) {
	var errorTimeout = this.messageHideInterval;
	var positionClass = this.positionClass;
	
	if (!config) config = {};
	
	setTimeout(function() {
		toastr.options = {
			closeButton : config.closeButton || true,
			progressBar : config.progressBar || true,
			showMethod : config.showMethod || 'slideDown',
			timeOut : config.timeOut || errorTimeout,
			positionClass: config.positionClass || positionClass 
		};

		if (config.type == 'error') {
			toastr.error(msg, 'Error');
		} else {
			toastr.success(msg, 'Notification');
		}

	}, 0);
};

Message.prototype.show = function(msg, config) {
	this.showMessage(msg, config);
}

Message.prototype.handleError = function(response) {
	this.showMessage(response.message, {type: 'error'});
	
	$(response.data).each(function(){
		Message.prototype.displayFieldError(this);
	});
};

Message.prototype.displayFieldError = function(error) {
	if (!error || !error.fieldId || !error.fieldDisplayName) {
		console.error('I cannot display the error for the field!');
		return;
	}
	
	var validator = $("#"+ error.fieldId).closest('form').validate();
	var errors = {};
	errors[error.fieldDisplayName] = error.message;
	
	validator.showErrors(errors); 
};


Message.prototype.clearErrors = function(){
	$("label.error").each(function(){
		$(this).addClass('hide');
		$(this).parent().find('.form-control').removeClass('error');
	});
}