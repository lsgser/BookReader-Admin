function loadSchool(){
	$('#content').append(
		`<div class="text-center school-logo" >

		</div>
		<div class="d-flex justify-content-center">
			<h4 class="school-name mt-2"></h4>
	    	<div class="spinner-grow text-dark spin">
	    	</div>
		</div>
		<hr>
		<div class="d-flex justify-content-center">
			<h5 class="mt-3 school-of"></h5>
		</div>
		<hr>
		<label for="recipient-name" class="col-form-label">Search for a module</label>
		<input type="text" placeholder="Search module" class="form-control mt-3 module-name">
		<hr>
		<div class="d-flex justify-content-center list-group module-list">
		</div>
		<div class="spinner-border text-dark module-search-spinner">
	    </div>
		<div class="d-flex justify-content-center">
			<button type="button" class="btn btn-outline-success mt-3" onclick="newModuleModal()">Add module</button>
		</div>
		
		<div class="modal fade" id="newModuleModal" tabindex="-1" role="dialog" aria-labelledby="newModuleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="newModuleModalLabel">Add new module</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      		<div class="alert alert-danger" role="alert"></div>
		      		<div class="alert alert-success" role="alert"></div>
			        <div class="form-group">
			            <label for="recipient-name" class="col-form-label">Module Name</label>
			            <input type="text" placeholder="Type the module name" class="form-control" id="module_name">
			        </div>
			        <div class="form-group school_value">
			        </div>
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success module-spinner">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-dark" onclick="addModule()">Add module</button>
		      </div>
		    </div>
		  </div>
		</div>
		`
	)

	hideError()
}

function getCourseModules(){
	let queryString=window.location.search
	const urlParams = new URLSearchParams(queryString)

	$('.school-of').append(`
		<h5>Course - `+urlParams.get("cname")+`</h5>
	`)
}

function getSchool(){
	let queryString=window.location.search
	const urlParams = new URLSearchParams(queryString)
	showSpinner()
	axios.get(URL+"school/"+urlParams.get('i')).then(res=>{
		console.log(res.data.school_icon)
		$('.school-logo').append(`<img src="`+S_URL+res.data.school_icon+`" class="rounded"/>`)
		$('.school-name').text(res.data.school)
		hideSpinner()
	}).catch(err=>{
		$('.school-logo').append(`<img src="../img`+errorImage+`" class="rounded" width="10%" height="10%"/>`)
		$('.school-name').text("Error 404 something went wrong")
		hideSpinner()
	})
}