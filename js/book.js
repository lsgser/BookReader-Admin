function loadBook(){
	$('#content').append(
		`<div class="text-center logo" >
			<img src="`+R_URL+logo+`" class="rounded" width="10%" height="10%"/>
		</div>
		<div class="d-flex justify-content-center">
			<h4 class="mt-2">Book(s)</h4>
		</div>
		<hr>
		<label for="recipient-name" class="col-form-label">Search for a book</label>
		<input type="text" placeholder="Search book" class="form-control mt-3 book-name">
		<hr>
		<div class="container">
			<div class="row book-list">
			</div>
		</div>
		<h5 class="d-flex justify-content-center error-search"></h5>
		<div class="spinner-border text-dark book-search-spinner">
	    </div>
		<div class="d-flex justify-content-center">
			<button type="button" class="btn btn-outline-success mt-3" onclick="newBookModal()">Add book</button>
		</div>
		
		<div class="modal fade" id="newBookModal" tabindex="-1" role="dialog" aria-labelledby="newBookModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="newBookModalLabel">Add new book</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		      		<div class="alert alert-danger" role="alert"></div>
		      		<div class="alert alert-success" role="alert"></div>
			        <div class="form-group">
			            <label for="recipient-name" class="col-form-label">Title</label>
			            <input type="text" placeholder="Type the book title" class="form-control" id="title">

			            <label for="recipient-name" class="col-form-label">Author</label>
			            <input type="text" placeholder="Type the book author" class="form-control" id="author">

			            <label for="recipient-name" class="col-form-label">Publication year</label>
			            <input type="text" placeholder="Type the book publication year" class="form-control" id="year">

			            <label for="recipient-name" class="col-form-label">ISBN number</label>
			            <input type="text" placeholder="Type the books ISBN number" class="form-control" id="isbn">

			            <label for="recipient-name" class="col-form-label">Description(Optional)</label>
			            <input type="text" placeholder="Type the books description" class="form-control" id="description">
			        </div>
			        <div class="form-group">
			            <div class="input-group">
						  <div class="custom-file">
						    <input type="file" class="custom-file-input" id="cover_page" accept="image/*">
					    	<label class="custom-file-label" for="cover_page">Book cover page</label>
						  </div>
						</div>
			        </div>
			        <div class="form-group">
			            <div class="input-group">
						  <div class="custom-file">
						    <input type="file" class="custom-file-input" id="book" accept="application/pdf">
					    	<label class="custom-file-label" for="book">Select a PDF book for upload</label>
						  </div>
						</div>
			        </div>
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success book-spinner">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-dark" onclick="addBook()">Add module</button>
		      </div>
		    </div>
		  </div>
		</div>
		`
	)

	hideError()
	$('.book-search-spinner').hide()
}

/*
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
*/

function newBookModal(){
	hideError()
	hideSuccess()
	$('.book-spinner').hide()
	$('#newBookModal').modal('show')
}

function searchModule(){
	$('.book-search-spinner').hide()
	$('.book-name').keyup(function(){
          if($('.book-name').val().length==0)
          {
          	$('.book-list').html("")
          	$('.book-search-spinner').hide()  
          }else{
          	$('.book-search-spinner').show()
          	$('.book-list').html("")
          	axios.get(URL+"book_q/"+$('.book-name').val()).then(res=>{
          		$('.book-list').html("")
          		$('.book-search-spinner').hide()
          		if (res.data.length===0){
          			$('.book-list').append(`
						<h5 class="list-group-item list-group-item-dark">Book not available</h5>
					`)
          		}else{
          			res.data.forEach((b,index)=>{
          				$('.book-list').append(`
							<div class="col-md-4">
					          <div class="card mb-4 shadow-sm">
					          	<!--
					            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
					            -->
					            <img src="`+S_URL+b.cover_page+`" class="bd-placeholder-img card-img-top" width="80%" height="100%"/>
					            <div class="card-body">
					              <h5 class="card-text">Title : `+b.title+`</5>
					              <h5 class="card-text">Author : `+b.author+`</5>
					              <h5 class="card-text">Year published : `+b.publish_date+`</5>
					              <h5 class="card-text">ISBN : `+b.isbn+`</5>
					              <div class="d-flex justify-content-between align-items-center">
					                <div class="btn-group">
					                  <!--
					                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="goToSchool()">View</button>
					                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
					                  -->
					                </div>
					              </div>
					            </div>
					          </div>
					        </div>
						`)	
          			})
          		}

          	}).catch(err=>{
          		console.log(err)
          		$('.error-search').html("")
          		$('.book-search-spinner').hide()
          		$('.error-search').text("Something went wrong")
          	})	
          }
    })
}