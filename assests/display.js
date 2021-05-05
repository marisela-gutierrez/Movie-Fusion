var hamburgerEl = document.querySelector(".navbar-burger");
var navMenuEl = document.querySelector("#navbarLinks");

var favorites = [];
var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";
var id = 0;

// check to see if an image exists.  Returns correct path to existing image or placeholder image otherwise
var imageCheck = function (imagePath) {
  var imgSrc = "";
  if (imagePath) {
    imgSrc = imgPath + imagePath;
  } else {
    imgSrc = "https://via.placeholder.com/200x300?text=No+image+found";
  }
  return imgSrc;
};

// Function to display either movie or tv show with save button and title
var displayMovie = function (data, type) {
  console.log("in display movie");
  console.log(data);

  var cardEl = document.createElement("div");
  cardEl.className =
    "card column m-2 p-0 is-one-quarter is-two-fifths-mobile is-2-desktop is-shadowless is-clipped";
  // Displays title of movie/show
  if (type) {
    var mediaType = type;
  } else {
    var mediaType = data.media_type;
  }
  var cardHeaderEl = document.createElement("header");
  cardHeaderEl.classList = "card-header is-shadowless p-0";
  var title = "";
  if (mediaType === "tv") {
    title = data.name;
  } else {
    title = data.title;
  }
  cardHeaderEl.innerHTML =
    "<p class = 'card-header-title p-0 has-text-centered is-centered'>" +
    title +
    "</p>";
  //Displays the movie/show poster image
  var cardImageEl = document.createElement("div");
  cardImageEl.className = "card-image";
  var imgSrc = imageCheck(data.poster_path);
  cardImageEl.innerHTML =
    '<figure class="image"><img src="' +
    imgSrc +
    '" alt="' +
    data.title +
    '"></figure>';
  // Display the save/remove favorites button
  var cardFooterEl = document.createElement("footer");
  cardFooterEl.className = "card-footer";
  var cardBtnEl = document.createElement("button");
  cardBtnEl.classList = "button card-footer-item is-info";
  cardBtnEl.textContent = "Save to Favorites";
  cardBtnEl.setAttribute("data-id", data.id);
  cardBtnEl.setAttribute("data-type", mediaType);
  //Loop to check if movie is already in Local Storage and give appropriate display
  for (var index = 0; index < favorites.length; index++) {
    if (favorites[index].id === data.id) {
      cardBtnEl.classList = "button card-footer-item is-info is-light";
      cardBtnEl.textContent = "Remove Favorite";
      break;
    }
  }
  cardFooterEl.appendChild(cardBtnEl);
  //Links card to correct movie/show page
  var movieLinkEl = document.createElement("a");
  movieLinkEl.setAttribute(
    "href",
    "./movie.html?id=" + data.id + "&type=" + mediaType
  );
  cardEl.appendChild(cardFooterEl);
  movieLinkEl.appendChild(cardImageEl);
  movieLinkEl.appendChild(cardHeaderEl);
  cardEl.appendChild(movieLinkEl);
  return cardEl;
};

// Function to display an actor card with headshot and name and character name if appropriate
var displayActor = function (data) {
  //links card to correct actor page
  var cardEl = document.createElement("a");
  cardEl.setAttribute("href", "./actor-page.html?id=" + data.id);
  cardEl.className = "card column m-2 is-one-quarter-mobile has-text-centered is-centered";
  //Displays the actors headshot
  var cardImageEl = document.createElement("div");
  cardImageEl.className = "card-image";
  var imgSrc = imageCheck(data.profile_path);
  cardImageEl.innerHTML =
    '<figure class="image"><img src="' +
    imgSrc +
    '" alt="' +
    data.name +
    ' headshot"></figure>';
  cardEl.appendChild(cardImageEl);
  //Displays the actors name
  var cardMediaEl = document.createElement("div");
  cardMediaEl.className = "card-content p-0";
  cardMediaEl.innerHTML =
    '<div class="media"><div class="media-content p-0"><p class="subtitle">' +
    data.name;
  //Check to see if a character name is available to display
  if (data.character) {
    cardMediaEl.innerHTML +=
      '</p><p class="content">' + data.character + "</p></div></div>";
  } else {
    cardMediaEl.innerHTML += "</p></div></div>";
  }

  cardEl.appendChild(cardMediaEl);
  return cardEl;
};

// Save to show tmdb id and type to LocalStorage
var saveShow = function (id, type) {
  var newFav = {
    id: id,
    type: type,
  };
  favorites.push(newFav);
};

//Button handler to save movie or show from card elements
var showSaveHandler = function (event) {
  var id = parseInt(event.target.getAttribute("data-id"));
  var type = event.target.getAttribute("data-type");
  if (id) {
    var btnSelected = document.querySelector("button[data-id='" + id + "']");
    var count = 0;
    //check to see if show is already saved and add/remove from list as appropriate
    for (var i = 0; i < favorites.length; i++) {
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
      btnSelected.classList = "button card-footer-item is-info is-light";
      btnSelected.textContent = "Remove Favorite";
    }
    console.log(favorites);
    //Set updated list to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

//Loads favorites array from localStorage
var loadFavorites = function () {
  var favoriteList = localStorage.getItem("favorites");
  console.log(favoriteList);
  if (!favoriteList) {
    return false;
  }
  favorites = JSON.parse(favoriteList);
  console.log(favorites);
};

// Navbar display on touch screens for hamburger button
var hamburgerHandler = function (event) {
  hamburgerEl.classList.toggle("is-active");
  navMenuEl.classList.toggle("is-active");
};

loadFavorites();
hamburgerEl.addEventListener("click", hamburgerHandler);
