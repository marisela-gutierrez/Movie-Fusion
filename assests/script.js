var searchBarEl = document.querySelector("#searchBar");
var searchInputEl = document.querySelector("#search");
var multiContainerEl = document.querySelector("#multi-container");
var multiSearchTerm = document.querySelector("#multi-search-term");

// var moviesPath = "data.results[0].(id/media_type/title/poster_path/release_date)";
// var tvPath = "data.results[i].(id/media_type/name/poster_path/first_air_date)";
// var actorsPath = "data.results[i].(id/media_type/name/profile_path)";

var getMultiSearch = function (searchRequest) {
  // format the multi search api url
  var apiUrl =
    "https://api.themoviedb.org/3/search/multi?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US&page=1&query=" +
    searchRequest;
  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displaySearch(data, searchRequest);
      });
    } else {
      alert("Error: Search Not Found");
    }
  });
};

var searchHandler = function (event) {
  event.preventDefault();
  var searchRequest = searchInputEl.value.trim();
  if (searchRequest) {
    multiSearchTerm.textContent = searchRequest;
    getMultiSearch(searchRequest);
    searchInputEl.value = "";
  }
};

var displaySearch = function (multi, searchTerm) {
  // check if api returned any multi searches
  if (multi.length === 0) {
    multiContainerEl.textContent = "No Searches found.";
    return;
  }
  // clear old content
  multiContainerEl.textContent = "";
  multiSearchTerm.textContent = searchTerm;
  console.log(multi);
  // loop over repos
  for (var i = 0; i < multi.results.length; i++) {
    // create a container for each search
    var multiEl = document.createElement("div");
    multiEl.classList = "list-item flex-row justify-space-between align-center";
    var name = "";
    // Logic to display appropriate information based on mediatype of movie, TV or actor
    mediaType = multi.results[i].media_type;
    if (mediaType === "movie") {
      name = multi.results[i].title;
    } else if (mediaType === "tv") {
      name = multi.results[i].name;
    } else {
      name = multi.results[i].name;
    }

    // create a span element to hold search name
    var titleEl = document.createElement("span");
    titleEl.textContent = name;

    // append to container
    multiEl.appendChild(titleEl);

    // append container to the dom
    multiContainerEl.appendChild(multiEl);
  }
};

getMultiSearch();
// add event listeners to forms
searchBarEl.addEventListener("submit", searchHandler);
