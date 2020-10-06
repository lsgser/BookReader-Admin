function isLoginPage(){
	if (localStorage.getItem('token')){
		axios.get(URL+'admin_logged/'+localStorage.getItem('token'))
		.then(res=>{
			window.location.replace(R_URL+"admin.html")
		})
	}
}

function isNotLoginPage(){
	if (localStorage.getItem('token')){
		axios.get(URL+'admin_logged/'+localStorage.getItem('token'))
		.then(res=>{
			//Do nothing
		}).catch(err=>{
			window.location.replace(R_URL+"index.html")
		})
	}else{
		window.location.replace(R_URL+"index.html")
	}	
}