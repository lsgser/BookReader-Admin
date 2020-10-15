let s = null
let f = null
let c = null
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

		<div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="newUserModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="newUserModalLabel">Add new user</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      		<div class="alert alert-danger add-user-error" role="alert"></div>
		      		<div class="alert alert-success add-user-success" role="alert"></div>
		      		<div class="form-group">
		      			<label for="schoolFormControlSelect">Institution</label>
		      			<select class="form-control" id="school_select">
		      			</select>
		      		</div>
		      		<div class="form-group">
		      			<label for="facultyFormControlSelect" class="faculty-label">Faculty</label>
		      			<select class="form-control" id="faculty_select">
		      			</select>
		      		</div>
		      		<div class="form-group">
		      			<label for="facultyFormControlSelect" class="course-label">Course</label>
		      			<select class="form-control" id="course_select">
		      			</select>
		      		</div>
			        <div class="form-group user-details">
			            <label for="recipient-name" class="col-form-label">Name</label>
			            <input type="text" placeholder="Name" class="form-control" id="name">
			            
			            <label for="recipient-surname" class="col-form-label">Surname</label>
			            <input type="text" placeholder="Surname" class="form-control" id="surname">


			            <label for="recipient-student-nr" class="col-form-label">Student number</label>
			            <input type="text" placeholder="Student number" class="form-control" id="student_nr">

			            <label for="recipient-email" class="col-form-label">Email</label>
			            <input type="email" placeholder="Email" class="form-control" id="email">

			            <label for="recipient-password" class="col-form-label">Password</label>
			            <input type="password" placeholder="Password" class="form-control" id="password">

			            <label for="recipient-confirm" class="col-form-label">Confirm password</label>
			            <input type="password" placeholder="Password" class="form-control" id="confirm">
			        </div>
			  
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success add-user-spinner">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-dark" onclick="addUser()">Add user</button>
		      </div>
		    </div>
		  </div>
		</div>
	`)
	
	$('.user-search-spinner').hide()
	$('.table-head').hide()
	$('#faculty_select').hide()
	$('#course_select').hide()
	$('.course-label').hide()
	$('.faculty-label').hide()
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.add-user-spinner').hide()
	$('.faculty-label').hide()
	$('.user-details').hide()
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
          		$('.error-search').html("")
          		$('.user-search-spinner').hide()
          		$('.error-search').text("Something went wrong")
          	})	
          }
    })
}

function newUserModal(){
	$('#newUserModal').modal('show')
	$('#school_select').html("")
	$("#faculty_select").html("")
	$("#course_select").html("")
	$('#course_select').hide()
	$('#faculty_select').hide()
	$('.faculty-label').hide()
	$('.course-label').hide()
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.user-details').hide()
	s = null
	f = null
	c = null
	axios.get(URL+'schools').then(res=>{
		$('#school_select').append(`<option selected>Select institution</option>`)
		res.data.forEach((s,index)=>{
			$('#school_select').append(`
				<option onclick="getSchool('`+s.school+`')">`+s.school+`</option>
			`)
		})	
	})
}

function getSchool(school){
	$("#faculty_select").html("")
	$("#faculty_select").html("")
	$("#course_select").html("")
	$('#course_select').hide()
	$('#faculty_select').hide()
	$('.faculty-label').hide()
	$('.course-label').hide()
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.user-details').hide()
	s = null
	f = null
	c = null
	axios.get(URL+"school/"+school).then(res=>{
		getFaculties(res.data.id)
	}).catch(err=>{
		$('.add-user-error').text(err.response.data.status)
		$('.add-user-error').show()
	})
}

function getFaculties(id){
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.faculty-label').hide()
	$("#faculty_select").html("")
	$('#faculty_select').hide()
	$('.user-details').hide()
	s = null
	f = null
	c = null
	axios.get(URL+"faculties/"+id).then(res=>{
		$('#faculty_select').append(`
			<option selected>Select faculty</option>
		`)
		res.data.forEach((f,index)=>{
			$('#faculty_select').append(`
				<option onclick="getCourse(`+f.id+`)">`+f.faculty+`</option>
			`)
		})
		if (res.data.length==0){
			$('.add-user-error').text("No faculties for this institution")
			$('.add-user-error').show()	
		}else{
			$('.faculty-label').show()
			$('#faculty_select').show()
		}
		
	}).catch(err=>{
		$('.add-user-error').text(err.response.data.status)
		$('.add-user-error').show()
	})
}

function getCourse(faculty){
	$('.course-label').hide()
	$('#course_select').hide()
	$('#course_select').html("")
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.user-details').hide()
	s = null
	f = null
	c = null
	axios.get(URL+"courses_f/"+faculty).then(res=>{
		$('#course_select').append(`
			<option selected>Select course</option>
		`)
		res.data.forEach((c,index)=>{
			$('#course_select').append(`
				<option onclick="storeInstitution(`+c.id+`,`+c.faculty+`,`+c.school+`)">`+c.course+`</option>
			`)
		})
		if (res.data.length==0){
			$('.add-user-error').text("No course for this institution")
			$('.add-user-error').show()	
		}else{
			$('.course-label').show()
			$('#course_select').show()
		}
		
	}).catch(err=>{
		$('.add-user-error').text(err.response.data.status)
		$('.add-user-error').show()
	})
}

function enrollUserModal(){

}

function enroll(user,module){
	
}

function addUser(){
	$('.add-user-error').hide()
	$('.add-user-success').hide()
	$('.add-user-spinner').hide()
	let formData = new FormData()
	if (s && f && c && $('#name').val() && $('#surname').val() && $('#email').val() && $('#password').val() && $('#confirm').val() && $('#student_nr').val()){
		if ($('#password').val() == $('#confirm').val()){
			$('.add-user-spinner').show()
			axios.post(URL+'new_user',JSON.stringify({
					'school':s,
					'faculty':f,
					'course':c,
					'student':$('#student_nr').val(),
					'name': $('#name').val(),
					'surname':$('#surname').val(),
					'email':$('#email').val(),
					'password':$('#password').val(),
					'token':localStorage.getItem('token')
				})
			).then(res=>{
				s = null
				f = null
				c = null
				$('#name').val('')
				$('#surname').val('')
				$('#email').val('')
				$('#password').val('')
				$('#confirm').val('')
				$('#student_nr').val('')
				$('.user-details').hide()

				$('.add-user-spinner').hide()
				$('.add-user-success').text("New user added")
				$('.add-user-success').show()	
			}).catch(err=>{
				$('.add-user-spinner').hide()
				$('.add-user-error').text(err.response.data.status)
				$('.add-user-error').show()	
			})

		}else{
			$('.add-user-error').text("Password and the confirmation password does not match")
			$('.add-user-error').show()	
		}
	}else{
		$('.add-user-error').text("Fill in all the required fields")
		$('.add-user-error').show()	
	}
}

function storeInstitution(course,faculty,school){
	s = school
	f = faculty
	c = course
	$('.user-details').show()
}

