function loadBook(){
	$('#content').append(
	`	<div class="text-center logo" >
			<img src="`+R_URL+logo+`" class="rounded" width="10%" height="10%"/>
		</div>
		<div class="d-flex justify-content-center">
			<h4 class="mt-2">Book(s)</h4>
		</div>
		<hr>
		<div class="container">
		<label for="recipient-name" class="col-form-label">Search for a book</label>
			<input type="text" placeholder="Search book" class="form-control mt-3 book-name">
		</div>
		<hr>
		<div class="container">
			<div class="row book-list">
			</div>
		</div>
		<h5 class="d-flex justify-content-center error-search"></h5>
		<h5 class="d-flex justify-content-center book-not-available"></h5>
		<div class="spinner-border text-dark book-search-spinner">
	    </div>
		<div class="d-flex justify-content-center">
			<button type="button" class="btn btn-outline-success mt-3 mb-3" onclick="newBookModal()">Add book</button>
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
		        <button type="button" class="btn btn-dark" onclick="addBook()">Add book</button>
		      </div>
		    </div>
		  </div>
		</div>

		<div class="modal fade" id="recommendModal" tabindex="-1" role="dialog" aria-labelledby="recommendModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="recommendModalLabel">Add book to module</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
			       <div class="alert alert-danger recommend-error" role="alert"></div>
		      		<div class="alert alert-success recommend-success" role="alert"></div>
		      		<div class="container book-info">
		      		</div>
		      		<div class="form-group">
		      			<label for="schoolFormControlSelect">Institution</label>
		      			<select class="form-control" id="school_select">
		      			</select>
		      		</div>
		      		<div class="form-group">
		      			<label for="moduleFormControlSelect" class="module-label">Module</label>
		      			<select class="form-control" id="module_select">
		      			</select>
		      		</div>
		          	<div class="d-flex justify-content-center">
				    	<div class="spinner-border text-success recommend-spinner">
				    	</div>
				    </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		`
	)

	hideError()
	$('.recommend-error').hide()
	$('.recommend-success').hide()
	$('.book-search-spinner').hide()
	$('.recommend-spinner').hide()
}

function newBookModal(){
	hideError()
	hideSuccess()
	$('.book-spinner').hide()
	$('#newBookModal').modal('show')
}

function searchBook(){
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
          			$('.book-not-available').html("")
          			$('.error-search').text("Book not available")
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
					              <h6 class="card-text">Title : `+b.title+`</h6>
					              <h6 class="card-text">Author : `+b.author+`</h6>
					              <h6 class="card-text">Year published : `+b.publish_date+`</h6>
					              <h6 class="card-text">ISBN : `+b.isbn+`</h6>
					              <div class="d-flex justify-content-center align-items-center">
					                <div class="btn-group">
					                  <button type="button" class="btn btn-sm btn-outline-secondary mt-3" onclick="recommendModal('`+b.isbn+`','`+b.cover_page+`','`+b.title+`','`+b.author+`','`+b.publish_date+`')">Add to module</button>					                  
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

function addBook(){
	hideError()
	hideSuccess()
	$('.book-spinner').hide()
	let formData = new FormData()
	let imageFile = document.querySelector('#cover_page')
	let bookFile = document.querySelector('#book')

	if($('#title').val() && $('#author').val() && $('#year').val() && $('#isbn').val() && imageFile.files[0] && bookFile.files[0]){
		formData.append('title',$('#title').val())
		formData.append('author',$('#author').val())
		formData.append('publish_date',$('#year').val())
		formData.append('isbn',$('#isbn').val())
		formData.append('description',$('#description').val())
		formData.append('cover_page',imageFile.files[0])
		formData.append('book',bookFile.files[0])
		formData.append("token",localStorage.getItem("token"))
		$('.book-spinner').show()
		axios.post(URL+"new_book",formData).then(res=>{
			writeSuccessText($('#title').val().toUpperCase()+" has been added")
			$('.book-spinner').hide()
			$('#title').val('') 
			$('#author').val('') 
			$('#year').val('') 
			$('#isbn').val('')
			$('#description').val('')
			$('#cover_page').val('')
			$('#book').val('')
			
			showSuccess()
		}).catch(err=>{
			$('.book-spinner').hide()
			writeErrorText(err.response.data.status)
			showError()
		})
	}else{
		writeErrorText('Fill in all the required fields')
		showError()
	}
}

function recommendModal(isbn,cover_page,title,author,date){
	$('.book-info').hide()
	$('.book-info').html("")
	$('.book-info').append(`
		<img src="`+S_URL+cover_page+`" class="bd-placeholder-img" width="50%" height="80%"/>
		<br>
		<hr>
	    <small class="">Title : `+title+`</small>
	    <br>
	    <hr>
	    <small class="">Author : `+author+`</small>
	    <br>
	    <hr>
	    <small class="">Year published : `+date+`</small>
	    <br>
	    <hr>
	    <small class="">ISBN : `+isbn+`</small>
	    <hr>
	`)
	$('#recommendModal').modal('show')
	$('.book-info').show()
	$('#school_select').html("")
	$("#module_select").html("")
	$('#module_select').hide()
	$('.module-label').hide()
	$('.recommend-error').hide()
	$('.recommend-success').hide()
	axios.get(URL+'schools').then(res=>{
		$('#school_select').append(`<option selected>Select institution</option>`)
		res.data.forEach((s,index)=>{
			$('#school_select').append(`
				<option onclick="getSchool('`+s.school+`','`+isbn+`')">`+s.school+`</option>
			`)
		})	
	})
}

function getModules(school,book){
	$('.recommend-error').hide()
	$('.recommend-success').hide()
	$('.module-label').hide()
	$("#module_select").html("")
	$('#module_select').hide()
	$('.user-details').hide()
	
	axios.get(URL+"modules_s/"+school).then(res=>{
		$('#module_select').append(`
			<option selected>Select module</option>
		`)
		res.data.forEach((m,index)=>{
			$('#module_select').append(`
				<option onclick="recommendBook(`+m.id+`,'`+book+`')">`+m.module+`</option>
			`)
		})
		if (res.data.length==0){
			$('.recommend-error').text("No module for this institution")
			$('.recommend-error').show()	
		}else{
			$('.module-label').show()
			$('#module_select').show()
		}
		
	}).catch(err=>{
		$('.recommend-error').text(err.response.data.status)
		$('.recommend-error').show()
	})
}

function getSchool(school,book){
	$("#module_select").html("")
	$('#module_select').hide()
	$('.module-label').hide()
	$('.recommend-error').hide()
	$('.recommend-success').hide()
	axios.get(URL+"school/"+school).then(res=>{
		getModules(res.data.id,book)
	}).catch(err=>{
		$('.recommend-error').text(err.response.data.status)
		$('.recommend-error').show()
	})
}

function recommendBook(m,b){
	$('.recommend-error').hide()
	$('.recommend-success').hide()
	$('.recommend-spinner').show()
	axios.post(URL+"new_recommend",JSON.stringify({
		book:b,
		module:m,
		token:localStorage.getItem('token')
	})).then(res=>{
		$('.recommend-spinner').hide()
		$('.recommend-success').text("Book added as a recommended book for the selected module")
		$('.recommend-success').show()
	}).catch(err =>{
		$('.recommend-spinner').hide()
		$('.recommend-error').text(err.response.data.status)
		$('.recommend-error').show()
	})
}