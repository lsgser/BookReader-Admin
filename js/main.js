function navBar(){
$('#content').append(
	`<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
	  <a class="navbar-brand" href="#">Admin</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarCollapse">
	    <ul class="navbar-nav ml-auto">
	      <li class="nav-item mr-3">
	        <button class="btn btn-outline-success my-2 my-sm-0 ml-" onclick="newSchoolModal()">New School</button>
	      </li>
	      <li class="nav-item">
	        <button class="btn btn-outline-success my-2 my-sm-0 ml-auto" onclick="logout()">Logout</button>
	      </li>
	    </ul>  
	  </div>
	</nav>

	<div class="modal fade" id="newSchoolModal" tabindex="-1" role="dialog" aria-labelledby="newSchoolModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="newSchoolModalLabel">Add new school</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
		        <div class="form-group">
		            <label for="recipient-name" class="col-form-label">School Name</label>
		            <input type="text" placeholder="Add school name" class="form-control" id="school_name">
		        </div>
		        <div class="form-group">
		            <div class="input-group mb-3">
					  <div class="custom-file">
					    <input type="file" class="custom-file-input" id="school_icon">
					    <label class="custom-file-label" for="school_icon">Choose school image logo</label>
					  </div>
					</div>
		        </div>
	          	<div class="d-flex justify-content-center">
			    	<div class="spinner-border text-success">
			    	</div>
			    </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-dark">Add school</button>
	      </div>
	    </div>
	  </div>
	</div>
	`
	)
}

function logout(){
	axios.delete(URL+"admin_logout/"+localStorage.getItem("token")).then(res=>{
		localStorage.removeItem("token")
		window.location.replace(R_URL+"index.html")
	})
}

function newSchoolModal(){
	$('#newSchoolModal').modal()
}