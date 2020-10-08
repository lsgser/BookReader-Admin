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
			<h5 class="mt-3">Faculties</h5>
		</div>
		<hr>
		<div class="d-flex justify-content-center list-group faculty-list">
		</div>
		<div class="d-flex justify-content-center add-faculty">
		</div>

		<div class="modal fade" id="newFacultyModal" tabindex="-1" role="dialog" aria-labelledby="newFacultyModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="newFacultyModalLabel">Add new faculty</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      		<div class="alert alert-danger" role="alert"></div>
			        <div class="form-group">
			            <label for="recipient-name" class="col-form-label">Faculty Name</label>
			            <input type="text" placeholder="Type the faculty name" class="form-control" id="faculty_name">
			        </div>
			        <div class="form-group school_value">
			        </div>
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success spin">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-dark" onclick="addFaculty()">Add school</button>
		      </div>
		    </div>
		  </div>
		</div>

		<div class="modal fade" id="newCourseModal" tabindex="-1" role="dialog" aria-labelledby="newCourseModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title new-course-modal" id="newCourseModalLabel"></h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      		<div class="alert alert-danger" role="alert"></div>
			        <div class="form-group">
			            <label for="recipient-name" class="col-form-label">Add Course</label>
			            <input type="text" placeholder="Type the course name" class="form-control" id="course_name">
			        </div>
			        <div class="d-flex justify-content-center list-group course-list scrollable">
					</div>
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success spin">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer footer-course">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		`
	)

	hideError()
}

function getSchool(){
	let queryString=window.location.search
	const urlParams = new URLSearchParams(queryString)
	showSpinner()
	axios.get(URL+"school/"+urlParams.get('s')).then(res=>{
		console.log(res.data.school_icon)
		$('.school-logo').append(`<img src="`+S_URL+res.data.school_icon+`" class="rounded"/>`)
		$('.school-name').text(res.data.school)
		$('.school_value').append(`
			<input type="text" placeholder="Type the faculty name" value="`+res.data.id+`"  class="form-control" id="school_name" hidden>
		`)
		getFaculties(res.data.id)
		//hideSpinner()
	}).catch(err=>{
		$('.school-logo').append(`<img src="../img`+errorImage+`" class="rounded" width="10%" height="10%"/>`)
		$('.school-name').text("Error 404 something went wrong")
		hideSpinner()
	})
}

function getFaculties(id){
	axios.get(URL+"faculties/"+id).then(res=>{
		res.data.forEach((f,index)=>{
			$('.faculty-list').append(`
				<a href="#" class="list-group-item list-group-item-dark" onclick="newCourseModal(`+f.id+`,`+f.school+`,'`+f.faculty+`')">`+f.faculty+`</a>
			`)
		})
		if (res.data.length==0){
			$('.faculty-list').append(`
				<h6>No faculties for this institution</h6>
			`)	
		}
		$('.add-faculty').append(
			`<button class="btn btn-outline-success mt-3" onclick="newFacultyModal()">Add Faculty</button>`
		)
		hideSpinner()
	}).catch(err=>{
		hideSpinner()
	})
}

function newFacultyModal(){
	hideSpinner()
	hideError()
	$('#newFacultyModal').modal('show')
}

function addFaculty(){
	hideSpinner()
	hideError()
	if($('#school_name').val() && $('#faculty_name').val()){
		showSpinner()	
		axios.post(URL+"new_faculty",{school:parseInt($('#school_name').val()),faculty:$('#faculty_name').val(),token:localStorage.getItem("token")}).then(res=>{
			location.reload()
		}).catch(err=>{
			hideSpinner()
			writeErrorText(errorMessage(err.response.data.status))
			showError()
		})
	}else{
		writeErrorText(errorMessage('Fill in all the required field'))
		showError()
	}
}

function newCourseModal(faculty,school,faculty_name){
	hideSpinner()
	hideError()
	$('.footer-course').html('')
	$('.footer-course').append(`
		<button type="button" class="btn btn-dark" onclick="addCourse(`+faculty+`,`+school+`)">Add course</button>
	`)
	$('.new-course-modal').html(`Add new course : `+faculty_name)
	$('#newCourseModal').modal('show')
	getCourses(faculty)	
}

function getCourses(faculty){
	showSpinner()
	$('.course-list').html('')
	axios.get(URL+"courses_f/"+faculty).then(res=>{
		res.data.forEach((c,index)=>{
			$('.course-list').append(`
				<a href="#" class="list-group-item list-group-item-dark" onclick="goToCourse(`+c.school+`,`+c.faculty+`,`+c.id+`,'`+c.course+`')">`+c.course+`</a>
			`)
		})

		if (res.data.length==0){
			$('.course-list').append(`
				<h5 class="list-group-item list-group-item-dark">No courses added for this faculty</h5>
			`)
		}
		hideSpinner()
	}).catch(err=>{
		hideSpinner()
		writeErrorText(errorMessage(err.response.data.status))
		showError()
	})
}

function addCourse(faculty,school){
	hideSpinner()
	hideError()
	if ($('#course_name').val()){
		showSpinner()	
		axios.post(URL+"new_course",{faculty:parseInt(faculty),school:parseInt(school),course:$('#course_name').val(),token:localStorage.getItem("token")}).then(res=>{
			$('#course_name').val('')
			getCourses(faculty)
		}).catch(err=>{
			hideSpinner()
			writeErrorText(errorMessage(err.response.data.status))
			showError()
		})
	}else{
		writeErrorText(errorMessage('Fill in all the required field'))
		showError()
	}
}

function goToCourse(school,faculty,course,course_name){
	let queryString=window.location.search
	const urlParams = new URLSearchParams(queryString)
	window.location.href= R_URL+"course.html?i="+urlParams.get("s")+"&cname="+course_name+"&f="+faculty+"&c="+course+"&s="+school
}
