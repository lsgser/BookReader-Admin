function loginForm(){
	$('#content').append(`
		<div class="form-signin">
	      <img class="mb-4" src="./img/bootstrap-solid.svg" alt="" width="72" height="72">
	      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
	      <div class="alert alert-danger" role="alert"></div>
	      <label for="inputEmail" class="sr-only">Email address</label>
	      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
	      <label for="inputPassword" class="sr-only">Password</label>
	      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
	      <!--
	      <div class="checkbox mb-3">
	        <label>
	          <input type="checkbox" value="remember-me"> Remember me
	        </label>
	      </div>
	      -->
	      <button class="btn btn-lg btn-dark btn-block" onclick="signIn()">Sign in</button>
	      <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    	</div>`
    )

    hideError()
}

function signIn(){
	/*
		Use axios.post
	*/
	hideError()
	if($('#inputEmail').val() !== "" && $('#inputPassword').val()!== ""){
		axios.post(URL+'admin_login',{
			email:$('#inputEmail').val(),
			password:$('#inputPassword').val()
		}).then(res =>{
			hideError()
			localStorage.setItem('token',res.data.token)
			window.location.replace(R_URL+"admin.html")
			
		}).catch(err =>{
			errMsg = errorMessage(err.response.data.status)
			$('.alert-danger').text(errMsg)
			showError()
			//console.log(errMsg)
		})
	}else{
		errMsg = errorMessage("Fill in all fields")
		$('.alert-danger').text(errMsg)
		showError()
		//console.log('Hey '+errMsg)
	}
}