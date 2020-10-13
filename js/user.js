function loadUser(){$('#content').append(`
		<div class="text-center logo" >
			<img src="`+R_URL+logo+`" class="rounded" width="10%" height="10%"/>
		</div>
		<div class="d-flex justify-content-center">
			<h4 class="mt-2">User(s)</h4>
		</div>
		<hr>
		<div class="container">
			<label for="recipient-name" class="col-form-label">Search for a user</label>
			<input type="text" placeholder="Search user" class="form-control mt-3 user-name">
				<div class="table-responsive">
					<table class="table table-striped">
						<thead class="table-head">
							<tr>
								<th>Name</th>
								<th>Surname</th>
								<th>Student Number</th>
								<th>Email</th>
								<th>Enroll</th>
							</tr>
						</thead>
						<tbody class="user-list">
						</tbody>
					</table>
				</div>
			
			<h5 class="d-flex justify-content-center error-search"></h5>
			<h5 class="d-flex justify-content-center user-not-available"></h5>
			<div class="spinner-border text-dark user-search-spinner">
		    </div>
	    </div>
	    <hr>
	    <div class="d-flex justify-content-center">
			<button type="button" class="btn btn-outline-success mt-3 mb-3" onclick="newUserModal()">Add user</button>
		</div>
	`)
	
	$('.user-search-spinner').hide()
	$('.table-head').hide()
}

function searchUser(){
	$('.user-name').keyup(function(){
		  $('.error-search').html("")
		  $('.table-head').hide()
		  $('.user-list').html("")
		  $('.user-search-spinner').hide()
          if($('.user-name').val().length!==0)
          {
          	$('.user-search-spinner').show()
          	axios.get(URL+"users_q/"+$('.user-name').val()).then(res=>{
          		$('.user-list').html("")
          		$('.user-search-spinner').hide()
          		if (res.data.length===0){
          			$('.user-not-available').html("")
          			$('.error-search').text("User not available")
          		}else{
          			$('.table-head').show()
          			res.data.forEach((u,index)=>{
          				$('.user-list').append(`
          					<tr>
								<td>`+u.name+`</td>
								<td>`+u.surname+`</td>
								<td>`+u.student+`</td>
								<td>`+u.email+`</td>
								<td><button type="button" class="btn btn-outline-success" onclick="enrollUserModal()">Enroll</button></td>
							</tr>
						`)	
          			})
          		}

          	}).catch(err=>{
          		console.log(err)
          		$('.error-search').html("")
          		$('.user-search-spinner').hide()
          		$('.error-search').text("Something went wrong")
          	})	
          }
    })
}

function newUserModal(){

}

function enrollUserModal(){

}

function enroll(user,module){
	
}