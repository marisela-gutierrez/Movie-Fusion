var searchBarEl = document.querySelector("#searchBar");
var searchInputEl = document.querySelector("#search");
var multiContainerEl = document.querySelector("#multi-container");
var multiSearchTerm = document.querySelector("#multi-search-term");
var searchResultsEl = document.querySelector("#search-display");
var posterEl = document.querySelector("#poster");
var can = document.querySelector('#canvas1');
var ctx = can.getContext('2d');
var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";
var img=[];

// Displays the current top 5 most popular movies
var topRated = function () {
  var apiUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US&page=1";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        heroImages(data);
        for (var i = 0; i < Math.min(5, data.results.length); i++) {
          var cardEl = displayMovie(data.results[i],"movie");
          posterEl.appendChild(cardEl);
        }
      });
    } else {
      posterEl.textContent = "We encountered a problem with loading the top rated movies"
    }
  });
};

// Pulls poster images from top 10 movies and stores in img array
var heroImages = function(data){
  //Designate canvas size of 10 images side by side with dimensions 250x250
  can.width = 2500;
  can.height = 250;
  for (var i = 0; i < Math.min(10, data.results.length); i++) {
    img[i] = document.createElement("img");
    img[i].height = 250;
    img[i].src = imgPath + data.results[i].poster_path;
  }
  window.onload = heroDisplay();
}

var heroDisplay = function(){
  //Start first image offset to the left to compensate for any padding/margins
  var imgWidth = -250;
  var scrollSpeed = 2.5;
  //loop to place all 10 images in array overflowing to the left so they can animate onto the screen
  var loop = function(){
    for (var i=0; i<10; i++){
    ctx.drawImage(img[i], imgWidth - (250*i), 0);
    }
    //Second loop to show the same 10 images on screen and overflowing to the right
    for (var i=0; i<10; i++){
      ctx.drawImage(img[i], imgWidth - (250*i) + 250*10, 0);
      }
    // move displayed image over at the scroll speed
    imgWidth += scrollSpeed;
    // Once all ten images scroll through, reset to starting position
    if (imgWidth === 250*9){
      imgWidth = -250;
    }
    // Recursive function to continue animation sequence
    window.requestAnimationFrame(loop);
  }
  //Initiate animation loop
  loop();
}


// An API call based on the search input and display call to show results
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
      searchResultsEl.textContent = "There was an issue finding the search results, please try again later.";
    }
  });
};

// Collects search term and sends to multSearch function
var searchHandler = function (event) {
  event.preventDefault();
  var searchRequest = searchInputEl.value.trim();
  if (searchRequest) {
    getMultiSearch(searchRequest);
    searchInputEl.value = "";
  }
};

// Displays search results (max 5) of movies/tv shows or actors
var displaySearch = function (multi, searchTerm) {
  // check if api returned any multi searches
  multiContainerEl.textContent = "";
  if (multi.results.length === 0) {
    searchResultsEl.textContent = "No Searches found.";
    return;
  }
  searchResultsEl.innerHTML =
    "<h2 class = 'subtitle column is-full'> Showing movies for:  " + searchTerm;
  // loop over search results
  for (var i = 0; i < Math.min(5, multi.results.length); i++) {
    // create a container for each search
    var multiEl = document.createElement("div");
    multiEl.classList = "list-item flex-row justify-space-between align-center";
    // Logic to display appropriate information based on mediatype of movie, TV or actor
    mediaType = multi.results[i].media_type;
    if (mediaType === "person") {
      var cardEl = displayActor(multi.results[i]);
    } else {
      var cardEl = displayMovie(multi.results[i]);
    }
    // append container to the dom
    multiContainerEl.appendChild(cardEl);
  }
};

topRated();
searchBarEl.addEventListener("submit", searchHandler);
multiContainerEl.addEventListener("click", showSaveHandler);
posterEl.addEventListener("click", showSaveHandler);
