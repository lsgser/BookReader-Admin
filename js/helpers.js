function showError(){
	$('.alert-danger').show()
}

function hideError(){
	$('.alert-danger').hide()
}

function errorMessage(message){
	let m = ''
	if (message){
		m = message
	}

	return m
}	