function Message() {
	this.messageHideInterval = 3500;
}

Message.prototype.showMessage = function(msg, type) {
	var errorTimeout = this.messageHideInterval;
	setTimeout(function() {
		toastr.options = {
			closeButton : true,
			progressBar : true,
			showMethod : 'slideDown',
			timeOut : errorTimeout
		};

		if (type == 'error') {
			toastr.error(msg, 'Notification');
		} else {
			toastr.success(msg, 'Notification');
		}

	}, 0);
};

Message.prototype.show = function(msg, type) {
	this.showMessage(msg, type);
}

Message.prototype.handleError = function(response) {
	new Message().showMessage(response.message, 'error');
	
	var message = new Message();
	$(response.data).each(function(){
		message.displayFieldError(this);
	});
};

Message.prototype.displayFieldError = function(error) {
	var field = $(".error[for='"+ error.fieldId +"']");
	
	if (field){
		$(field).removeClass('hide');
		$(field).parent().find('.form-control').addClass('error');
	}
};


Message.prototype.clearErrors = function(){
	$("label.error").each(function(){
		$(this).addClass('hide');
		$(this).parent().find('.form-control').removeClass('error');
	});
}