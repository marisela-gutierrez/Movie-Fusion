var searchBarEl = document.querySelector("#searchBar")
var searchInputEl = document.querySelector("#search");
var multiContainerEl = document.querySelector("#multi-container");
var multiSearchTerm = document.querySelector("#multi-search-term");

var id = 550;
mediaType = "movie" + "tv" + "person";

var getMultiSearch = function() {
  // format the multi search api url
  var apiUrl = "https://api.themoviedb.org/3/search/multi" + mediaType + "/" + id + "?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US&page=1&query=";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displaySearch(data);
        var searchDetails = document.createElement("div");
        var name = "";
        // Logic to display appropriate information based on mediatype of movie or TV
        if (mediaType === "movie") {
          name = data.title;
        } else {
          name = data.name;
        }
        searchDetails.innerHTML =
        "<h2 class='title'>" + name + "</h2>";
        // append container to the dom
        multiContainerEl.appendChild(searchDetails);
      });
      } else {
        alert("Error: Search Not Found");
      }
    });
};



// add event listeners to forms
searchBarEl.addEventListener("submit", getMultiSearch);