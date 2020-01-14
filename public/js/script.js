/* eslint-disable no-var */
/* eslint-disable space-before-blocks */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable space-in-parens */
/* eslint-disable no-console */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
var movieData = [];
var favMovieData = [];
function getMovies() {
  let data =  fetch('http://localhost:3000/movies')
  .then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(res) {
        const tbody = document.getElementById("moviesList");
        let moviesHtml = "";

        res.forEach( item =>  {
            movieData.push(item);
            moviesHtml = moviesHtml + 
                `<li>
                    ${item.id}  
                    ${item.title}  
                    ${item.posterPath} 
                     
                        <button class=btn-primary onclick=addFavourite(${item.id})>
                        Add to Favourites</button> 
            
                 </li>`;
                 tbody.innerHTML=moviesHtml;
            });
        return res;
      });
    }
  )
  .catch(function(err) {
    return null;
  });
  return data;
}

function getFavourites() {
  let data = fetch('http://localhost:3000/favourites')
  .then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(res) {
        const tbody = document.getElementById("favouritesList");
        let moviesHtml = "";

        res.forEach( item =>  {
            favMovieData.push(item);
            moviesHtml = moviesHtml + 
                `<li>
                    ${item.id}  
                    ${item.title}  
                    ${item.posterPath} 
                 </li>`;
                 tbody.innerHTML=moviesHtml;
            });
        return res;
      });
    }
  )
  .catch(function(err) {
   return null;
  });
  return data;
}

function addFavourite(movieId){

const selectedMovie = movieData.filter(item => item.id === movieId);
const duplicateData = favMovieData.filter(item => item.id === movieId);
if (duplicateData.length > 0) {
  throw new Error('Movie is already added to favourites');
}

  let data = fetch('http://localhost:3000/favourites', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(selectedMovie[0])
        
        }).then(resp =>{
          if (resp.status !== 200) {
           
           return new Error('Movie is already added to favourites');
          }
        }).catch(err => {
        });
        return data;
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


