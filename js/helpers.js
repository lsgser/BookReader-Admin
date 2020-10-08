function showError(){
	$('.alert-danger').show()
}

function hideError(){
	$('.alert-danger').hide()
}

function hideSuccess(){
	$('.alert-success').hide()
}

function showSuccess(){
	$('.alert-success').show()
}

function errorMessage(message){
	let m = ''
	if (message){
		m = message
	}

	return m
}

function hideSpinner(){
	$('.spin').hide()
}

function showSpinner(){
	$('.spin').show()
}

function writeErrorText(message){
	$('.alert-danger').text(message)
}

function writeSuccessText(message){
	$('.alert-success').text(message)
}

function goToAdmin(){
	window.location.href= R_URL+"admin.html"
}	

function reloadAdmin(){
	location.reload()
}	