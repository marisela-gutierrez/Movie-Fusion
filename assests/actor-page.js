var headShotEl = document.querySelector("#head-shot");
var actorInfoEl = document.querySelector("#actor-info");
var showsEl = document.querySelector("#shows");
var favorites = [];

var id = 976;
var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";

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
        headShotImg.setAttribute("src", imgPath + data.profile_path);
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
          var cardEl = document.createElement("div");
          cardEl.className =
            "card column m-2 p-0 is-one-quarter is-two-fifths-mobile is-2-desktop is-shadowless is-clipped";
          var cardHeaderEl = document.createElement("header");
          cardHeaderEl.classList = "card-header is-shadowless p-0";
          var title = "";
          if (data.cast[i].media_type === "movie") {
            title = data.cast[i].title;
          } else {
            title = data.cast[i].name;
          }
          cardHeaderEl.innerHTML =
            "<p class = 'card-header-title p-0 is-centered'>" + title + "</p>";

          var cardImageEl = document.createElement("div");
          cardImageEl.className = "card-image";
          imgSrc = imgPath + data.cast[i].poster_path;
          cardImageEl.innerHTML =
            '<figure class="image"><img src="' +
            imgSrc +
            '" alt="' +
            data.cast[i].title +
            '"></figure>';

          var cardFooterEl = document.createElement("footer");
          cardFooterEl.className = "card-footer";
          var cardBtnEl = document.createElement("button");
          cardBtnEl.classList = "button card-footer-item is-info";
          cardBtnEl.textContent = "Save to Favorites";
          cardBtnEl.setAttribute("data-id", data.cast[i].id);
          cardBtnEl.setAttribute("data-type", data.cast[i].media_type);

          for (var index = 0; index < favorites.length; index++) {
            if (favorites[index].id === data.cast[i].id) {
              cardBtnEl.classList = "button card-footer-item is-info is-light";
              cardBtnEl.textContent = "Remove Favorite";
              break;
            }
          }
          cardFooterEl.appendChild(cardBtnEl);
          var movieLinkEl = document.createElement("a");
          movieLinkEl.setAttribute("href", "#");
          cardEl.appendChild(cardFooterEl);
          movieLinkEl.appendChild(cardImageEl);
          movieLinkEl.appendChild(cardHeaderEl);
          cardEl.appendChild(movieLinkEl);
          showsEl.appendChild(cardEl);
        }
      });
    } else {
    }
  });
};

var favoritesHandler = function (event) {
  event.preventDefault();
  var id = parseInt(event.target.getAttribute("data-id"));
  var type = event.target.getAttribute("data-type");
  if (id) {
    var btnSelected = document.querySelector("button[data-id='" + id + "']");

    console.log(btnSelected);
    var count = 0;
    for (var i = 0; i < favorites.length; i++) {
      // console.log(favorites[i], id);
      if (favorites[i].id === id) {
        favorites.splice(i, 1);
        count++;
        btnSelected.classList = "button card-footer-item is-info";
        btnSelected.textContent = "Save to Favorites";
        break;
      }
    }
    if (count === 0) {
      var newFav = {
        id: id,
        type: type,
      };
      favorites.push(newFav);
      btnSelected.classList = "button card-footer-item is-info is-light";
      btnSelected.textContent = "Remove Favorite";
    }
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    //   showsEl.innerHTML="";
    //   knownFor();
  }
};

var loadFavorites = function () {
  var favoriteList = localStorage.getItem("favorites");
  console.log(favoriteList);
  if (!favoriteList) {
    return false;
  }
  favorites = JSON.parse(favoriteList);
  console.log(favorites);
};

loadFavorites();
actorInfo();
knownFor();
showsEl.addEventListener("click", favoritesHandler);
