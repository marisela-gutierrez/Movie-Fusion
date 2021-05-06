var headShotEl = document.querySelector("#head-shot");
var actorInfoEl = document.querySelector("#actor-info");
var showsEl = document.querySelector("#shows");

var getId = function () {
  // grab id from url query string
  var queryString = document.location.search;
  var actorId = queryString.split("=")[1];

  if (!actorId) {
    // if no repo was given, redirect to the homepage
    document.location.replace("./index.html");
  }
  id = actorId;
};

//Pulls actor headshot and information from TMDB
var actorInfo = function () {
  apiUrl =
    "https://api.themoviedb.org/3/person/" +
    id +
    "?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var headShotImg = document.createElement("img");
        var imgSrc = imageCheck(data.profile_path);
        headShotImg.setAttribute("src", imgSrc);
        headShotEl.appendChild(headShotImg);
        var actorDetails = document.createElement("div");
        actorDetails.innerHTML =
          "<h2 class='title'>" +
          data.name +
          "</h2><p class = 'subtitle'>" +
          data.birthday +
          "</p><p class = 'content'>" +
          data.biography +
          "</p>";
        actorInfoEl.appendChild(actorDetails);
      });
    } else {
    }
  });
};

//Finds other shows the actor has been in and displays card
var knownFor = function () {
  apiUrl =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/combined_credits?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        for (var i = 0; i < Math.min(data.cast.length, 10); i++) {
          var cardEl = displayMovie(data.cast[i]);
          showsEl.appendChild(cardEl);
        }
      });
    } else {
    }
  });
};

getId();
actorInfo();
knownFor();
showsEl.addEventListener("click", showSaveHandler);
