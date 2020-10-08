function searchModule(){
	$('.module-search-spinner').hide()
	$('.module-name').keyup(function(){
          if($('.module-name').val().length==0)
          {
          	$('.module-list').html("")
          	$('.module-search-spinner').hide()  
          }else{
          	$('.module-search-spinner').show()
          	$('.module-list').html("")
          	axios.get(URL+"module_n/"+getUrlValue('c')+"/"+$('.module-name').val()).then(res=>{
          		$('.module-list').html("")
          		$('.module-search-spinner').hide()
          		if (res.data.length===0){
          			$('.module-list').append(`
						<h5 class="list-group-item list-group-item-dark">The module does not exist for this course</h5>
					`)
          		}else{
          			res.data.forEach((m,index)=>{
          				$('.module-list').append(`
							<a class="list-group-item list-group-item-dark">`+m.module+`</a>
						`)	
          			})
          		}

          	}).catch(err=>{
          		$('.module-list').html("")
          		$('.module-search-spinner').hide()
          		$('.module-list').html("Something went wrong")
          	})	
          }
    })
}

function getUrlValue(type){
	let queryString=window.location.search
	const urlParams = new URLSearchParams(queryString)

	if (type==='c'){
		return urlParams.get("c")
	}else if (type==='s'){
		return urlParams.get("s")
	}else if (type==='f'){
		return urlParams.get("f")
	}else if (type==='m'){
		return urlParams.get("m")
	}else if (type==='i'){
		return urlParams.get("i")
	}
}

function newModuleModal(){
	$('.module-spinner').hide()
	hideError()
	hideSuccess()
	$('#newModuleModal').modal('show')
}

function addModule(){
	hideError()
	hideSuccess()
	if($('#module_name').val()){
		$('.module-spinner').show()
		axios.post(URL+"new_module",{
			token:localStorage.getItem('token'),
			school:parseInt(getUrlValue('s')),
			faculty:parseInt(getUrlValue('f')),
			course:parseInt(getUrlValue('c')),
			module:$('#module_name').val()
		}).then(res=>{
			writeSuccessText($('#module_name').val().toUpperCase()+" was added as a module successfully")
			$('#module_name').val('')
			$('.module-spinner').hide()
			showSuccess()	
		}).catch(err =>{
			writeErrorText(err.response.data.status)
			$('.module-spinner').hide()
			showError()
		})

	}else{
		writeErrorText(errorMessage('Fill in all the required field'))
		showError()
	}
}