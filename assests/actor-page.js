var headShotEl = document.querySelector("#head-shot");
var actorInfoEl = document.querySelector("#actor-info");
var showsEl = document.querySelector("#shows");
// var favorites = [];

var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";
var id = 0;

var getId = function () {
  // grab id from url query string
  var queryString = document.location.search;
  console.log(queryString);
  var actorId = queryString.split("=")[1];

  if (!actorId) {
    // if no repo was given, redirect to the homepage
    actorId = 976;
    // document.location.replace("./index.html");
  }
  id = actorId;
};

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
          // var cardEl = document.createElement("div");
          // cardEl.className =
          //   "card column m-2 p-0 is-one-quarter is-two-fifths-mobile is-2-desktop is-shadowless is-clipped";
          // var cardHeaderEl = document.createElement("header");
          // cardHeaderEl.classList = "card-header is-shadowless p-0";
          // var title = "";
          // if (data.cast[i].media_type === "movie") {
          //   title = data.cast[i].title;
          // } else {
          //   title = data.cast[i].name;
          // }
          // cardHeaderEl.innerHTML =
          //   "<p class = 'card-header-title p-0 is-centered'>" + title + "</p>";

          // var cardImageEl = document.createElement("div");
          // cardImageEl.className = "card-image";
          // imgSrc = imgPath + data.cast[i].poster_path;
          // cardImageEl.innerHTML =
          //   '<figure class="image"><img src="' +
          //   imgSrc +
          //   '" alt="' +
          //   data.cast[i].title +
          //   '"></figure>';

          // var cardFooterEl = document.createElement("footer");
          // cardFooterEl.className = "card-footer";
          // var cardBtnEl = document.createElement("button");
          // cardBtnEl.classList = "button card-footer-item is-info";
          // cardBtnEl.textContent = "Save to Favorites";
          // cardBtnEl.setAttribute("data-id", data.cast[i].id);
          // cardBtnEl.setAttribute("data-type", data.cast[i].media_type);

          // for (var index = 0; index < favorites.length; index++) {
          //   if (favorites[index].id === data.cast[i].id) {
          //     cardBtnEl.classList = "button card-footer-item is-info is-light";
          //     cardBtnEl.textContent = "Remove Favorite";
          //     break;
          //   }
          // }
          // cardFooterEl.appendChild(cardBtnEl);
          // var movieLinkEl = document.createElement("a");
          // movieLinkEl.setAttribute(
          //   "href",
          //   "./movie.html?id=" +
          //     data.cast[i].id +
          //     "&type=" +
          //     data.cast[i].media_type
          // );
          // cardEl.appendChild(cardFooterEl);
          // movieLinkEl.appendChild(cardImageEl);
          // movieLinkEl.appendChild(cardHeaderEl);
          // cardEl.appendChild(movieLinkEl);
          showsEl.appendChild(cardEl);
        }
      });
    } else {
    }
  });
};

getId();
// loadFavorites();
actorInfo();
knownFor();
showsEl.addEventListener("click", showSaveHandler);
