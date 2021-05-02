var favorites = [];
var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";

var imageCheck = function (imagePath) {
  var imgSrc = "";
  if (imagePath) {
    imgSrc = imgPath + imagePath;
  } else {
    imgSrc = "https://via.placeholder.com/200x300?text=No+image+found";
  }
  return imgSrc;
};

var displayMovie = function (data) {
  var cardEl = document.createElement("div");
  cardEl.className =
    "card column m-2 p-0 is-one-quarter is-two-fifths-mobile is-2-desktop is-shadowless is-clipped";
  var cardHeaderEl = document.createElement("header");
  cardHeaderEl.classList = "card-header is-shadowless p-0";
  var title = "";
  if (data.media_type === "movie") {
    title = data.title;
  } else {
    title = data.name;
  }
  cardHeaderEl.innerHTML =
    "<p class = 'card-header-title p-0 is-centered'>" + title + "</p>";

  var cardImageEl = document.createElement("div");
  cardImageEl.className = "card-image";
  var imgSrc = imageCheck(data.poster_path);
  // if (data.poster_path) {
  //   imgSrc = imgPath + data.poster_path;
  // } else {
  //   imgSrc = "https://via.placeholder.com/200x300?text=No+poster+found";
  // }
  cardImageEl.innerHTML =
    '<figure class="image"><img src="' +
    imgSrc +
    '" alt="' +
    data.title +
    '"></figure>';

  var cardFooterEl = document.createElement("footer");
  cardFooterEl.className = "card-footer";
  var cardBtnEl = document.createElement("button");
  cardBtnEl.classList = "button card-footer-item is-info";
  cardBtnEl.textContent = "Save to Favorites";
  cardBtnEl.setAttribute("data-id", data.id);
  cardBtnEl.setAttribute("data-type", data.media_type);

  for (var index = 0; index < favorites.length; index++) {
    if (favorites[index].id === data.id) {
      cardBtnEl.classList = "button card-footer-item is-info is-light";
      cardBtnEl.textContent = "Remove Favorite";
      break;
    }
  }
  cardFooterEl.appendChild(cardBtnEl);
  var movieLinkEl = document.createElement("a");
  movieLinkEl.setAttribute(
    "href",
    "./movie.html?id=" + data.id + "&type=" + data.media_type
  );
  cardEl.appendChild(cardFooterEl);
  movieLinkEl.appendChild(cardImageEl);
  movieLinkEl.appendChild(cardHeaderEl);
  cardEl.appendChild(movieLinkEl);
  return cardEl;
};

var displayActor = function (data) {
  var cardEl = document.createElement("a");
  cardEl.setAttribute("href", "./actor-page.html?id=" + data.id);
  cardEl.className = "card column m-2 is-one-quarter-mobile has-text-centered";
  var cardImageEl = document.createElement("div");
  cardImageEl.className = "card-image";
  var imgSrc = imageCheck(data.profile_path);
  // if (data.profile_path) {
  //   imgSrc = imgPath + data.profile_path;
  // } else {
  //   imgSrc = "https://via.placeholder.com/200x300?text=No+headshot+available";
  // }
  cardImageEl.innerHTML =
    '<figure class="image"><img src="' +
    imgSrc +
    '" alt="' +
    data.name +
    ' headshot"></figure>';
  cardEl.appendChild(cardImageEl);
  var cardMediaEl = document.createElement("div");
  cardMediaEl.className = "card-content p-0";
  cardMediaEl.innerHTML =
    '<div class="media"><div class="media-content p-0"><p class="subtitle">' +
    data.name +
    '</p><p class="content">' +
    data.character +
    "</p></div></div>";
  cardEl.appendChild(cardMediaEl);
  return cardEl;
};

var saveShow = function (id, type) {
  var newFav = {
    id: id,
    type: type,
  };
  favorites.push(newFav);
};

var showSaveHandler = function (event) {
  // event.preventDefault();
  var id = parseInt(event.target.getAttribute("data-id"));
  var type = event.target.getAttribute("data-type");
  if (id) {
    var btnSelected = document.querySelector("button[data-id='" + id + "']");
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
      saveShow(id, type);
      // var newFav = {
      //   id: id,
      //   type: type,
      // };
      // favorites.push(newFav);
      btnSelected.classList = "button card-footer-item is-info is-light";
      btnSelected.textContent = "Remove Favorite";
    }
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
