/*jshint esversion:6*/
$(() => {

  $('#movieForm').on('submit', (event) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });




  //Function Declarations
  function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=a958f88b')
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `<div class="col-md-6 col-lg-3">
          <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-danger" href="#">Movie Details</a>
          </div>
        </div>
        `;
        });

        console.log(output);
        $('#movies').html(output);

      })
      .catch((err) => {
        console.log(err);
      });

  }

});

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = "movie.html";
  return false;
}


function getMovie() {
  let id = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com/?i=' + id + '&apikey=a958f88b')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
      <div class="row">
        <div class="col-md-4">
        <img src="${movie.Poster}" clas="thumb">
        </div>
        <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
          <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
          <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
          <li class="list-group-item"><strong>Writer: </strong>${movie.Wrter}</li>
          <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
        </ul>
        </div>
      </div>
      <div>
        <div class="well">
        <h3>Plot</h3>
        <p class="lead">${movie.Plot}</p>
        <hr />
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success">View on IMDB</a>
        <a href="index.html"class="btn btn-danger">Go back</a>
      </div>
      </div>
      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });


}