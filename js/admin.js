function institutions(){
	$('#content').append(
	`<div class="album py-5 bg-light">
	    <div class="container">
	      <div class="row">
	      </div>
	    </div>
	    <div class="d-flex justify-content-center">
	    	<div class="spinner-grow text-secondary">
	    	</div>
	    </div>
	  </div>`
	)
}

function getSchools(){
	axios.get(URL+'schools').then(res=>{
		res.data.forEach((s,index)=>{
			$('.row').append(`
				<div class="col-md-4">
		          <div class="card mb-4 shadow-sm">
		          	<!--
		            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
		            -->
		            <img src="`+S_URL+s.school_icon+`" class="bd-placeholder-img card-img-top" width="100%" height="225"/>
		            <div class="card-body">
		              <p class="card-text">`+s.school+`</p>
		              <div class="d-flex justify-content-between align-items-center">
		                <div class="btn-group">
		                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
		                  <!--
		                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
		                  -->
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
			`)
		})	

		$('.spinner-grow').hide()
	})
}