var posterEl = document.querySelector("#poster");
var movieInfoEl = document.querySelector("#movie-info");
var sourcesEl = document.querySelector("#sources");
var castEl = document.querySelector("#cast");
var favoriteBtnEl = document.querySelector("#favorite");
var mainEl = document.querySelector("main");
var favorites = [];
var sources = [
  {
    id: 203,
    icon: "./assests/img/Netflix.jpg",
  },
  {
    id: 387,
    icon: "./assests/img/HBOMax.jpg",
  },
  {
    id: 372,
    icon: "./assests/img/Disney.jpg",
  },
  {
    id: 157,
    icon: "./assests/img/Hulu.jpg",
  },
  {
    id: 26,
    icon: "./assests/img/AmazonPrime.jpg",
  },
];

var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";
var id = 550;
mediaType = "movie";

var movieInfo = function () {
  var apiUrl =
    "https://api.themoviedb.org/3/" +
    mediaType +
    "/" +
    id +
    "?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
  fetch(apiUrl).then(function (response) {
    console.log(response);
    if (response.ok){
    response.json().then(function (data) {
        
      console.log(data);
      var posterImg = document.createElement("img");
      posterImg.setAttribute("src", imgPath + data.poster_path);
      posterEl.appendChild(posterImg);
      var movieDetails = document.createElement("div");
      var date = "";
      var name = "";
      if (mediaType === "movie") {
        date = data.release_date.slice(0, 4);
        name = data.title;
      } else {
        name = data.name;
        if (
          data.first_air_date.slice(0, 4) === data.last_air_date.slice(0, 4)
        ) {
          date = data.first_air_date.slice(0, 4);
        } else {
          date =
            data.first_air_date.slice(0, 4) +
            " - " +
            data.last_air_date.slice(0, 4);
        }
      }
      movieDetails.innerHTML =
        "<h2 class='title'>" + name + "<span> (" + date + ")</span></h2>";
      var genres = "";
      for (var i = 0; i < Math.min(data.genres.length, 5); i++) {
        genres += data.genres[i].name;
        if (i + 1 < Math.min(data.genres.length, 5)) {
          genres += ", ";
        }
      }
      movieDetails.innerHTML += "<p class='subtitle'>" + genres + "</p>";
      if (mediaType === "movie") {
        movieDetails.innerHTML +=
          "<p class='subtitle'>" + data.runtime + " min</p>";
      } else {
        movieDetails.innerHTML +=
          "<p class='subtitle'>Seasons: " +
          data.number_of_seasons +
          "</br>Episodes: " +
          data.number_of_episodes +
          "</br>Avg. Run Time: " +
          data.episode_run_time +
          " min</p>";
      }
      movieDetails.innerHTML += "<p class='content'>" + data.overview + "</p>";
      movieInfoEl.appendChild(movieDetails);
    
    });
} else {
    var errorCode = response.status;
    if (response.statusText){
        errorCode += " - " + response.statusText;
    }
    mainEl.innerHTML = "<h2 class = 'title has-text-centered'> We apologize for the incovienance, but there seems to be an error:</br>" + errorCode + "</br>You will be redirected to the main search page soon.</h2>";
}
  });
};

var sourcesInfo = function () {
  var apiUrl =
    "https://api.watchmode.com/v1/search/?apiKey=Mn16itVChM3v7tkB3DIeEwYB6ogYSJiCHvC6jPtC&search_field=tmdb_" +
    mediaType +
    "_id&search_value=" +
    id;
  fetch(apiUrl).then(function (response) {
      if (response.ok){
    response.json().then(function (data) {
      var innerApiUrl =
        "https://api.watchmode.com/v1/title/" +
        data.title_results[0].id +
        "/sources/?apiKey=Mn16itVChM3v7tkB3DIeEwYB6ogYSJiCHvC6jPtC&regions=US";
      fetch(innerApiUrl).then(function (response) {
        response.json().then(function (info) {
          var count = 0;

          for (var i = 0; i < sources.length; i++) {
            console.log(i);

            for (var index = 0; index < info.length; index++) {
              console.log(sources[i].id, info.length);
              if (sources[i].id === info[index].source_id) {
                console.log("match");
                var streamLink = document.createElement("div");
                streamLink.className = "column";
                streamLink.innerHTML =
                  "<a href='" +
                  info[index].web_url +
                  "'><img src='" +
                  sources[i].icon +
                  "' alt='Streaming Link'></a>";
                sourcesEl.appendChild(streamLink);
                count++;
              }
            }
          }
          if (count === 0) {
            console.log("no movies");
            sourcesEl.innerHTML =
              "<p class='column is-full'>There are no streaming sources available for this title. </br>Please visit TMDB for other streaming or rental options:</p><a class='column is-full' href='https://www.themoviedb.org/" + mediaType + "/" + id +"/watch'><img src='./assests/img/tmdb-logo.svg' alt='TMDB logo' width='350' height='150'></a>";
          }
          console.log(info);
        });
      });
    });
} else{
    sourcesEl.innerHTML = "There seems to be a problem finding streaming sources, please visit..."
}
  });
};

var castInfo = function () {
  var apiUrl =
    "https://api.themoviedb.org/3/" +
    mediaType +
    "/" +
    id +
    "/credits?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
  fetch(apiUrl).then(function (response) {
    if (response.ok){
    response.json().then(function (data) {
      for (var i = 0; i < Math.min(data.cast.length, 5); i++) {
        var cardEl = document.createElement("a");
        cardEl.setAttribute("href", "#");
        cardEl.className = "card column is-one-third-mobile has-text-centered-mobile";
        var cardImageEl = document.createElement("div");
        cardImageEl.className = "card-image";

        imgSrc = imgPath + data.cast[i].profile_path;
        cardImageEl.innerHTML =
          '<figure class="image"><img src="' +
          imgSrc +
          '" alt="' +
          data.cast[i].name +
          ' headshot"></figure>';
        cardEl.appendChild(cardImageEl);
        var cardMediaEl = document.createElement("div");
        cardMediaEl.className = "card-content";
        cardMediaEl.innerHTML =
          '<div class="media"><div class="media-content"><p class="subtitle">' +
          data.cast[i].name +
          '</p><p class="content">' +
          data.cast[i].character +
          "</p></div></div>";
        cardEl.appendChild(cardMediaEl);
        castEl.appendChild(cardEl);
      }
      console.log(data);
    });
   } else {
       castEl.innerHTML = "There were some problems finding cast members for this show: " + response.statusText;
   }
  });
};

var favoritesHandler = function (event) {
  var count = 0;
  for (var i = 0; i < favorites.length; i++) {
    console.log(favorites[i], id);
    if (favorites[i].id === id) {
      favorites.splice(i, 1);
      count++;
      favoriteBtnEl.classList = "button is-info";
      favoriteBtnEl.textContent = "Add to Watchlist";
      break;
    }
  }
  if (count === 0) {
    var newFav = {
      id: id,
      type: mediaType,
    };
    favorites.push(newFav);

    favoriteBtnEl.classList = "button is-info is-light";
    favoriteBtnEl.textContent = "Remove from Watchlist";
  }
  console.log(favorites);
  localStorage.setItem("favorites",JSON.stringify(favorites));
};

var loadFavorites = function(){
    var favoriteList = localStorage.getItem("favorites");
    console.log(favoriteList);
    if(!favoriteList){
        return false;
    }
    favorites = JSON.parse(favoriteList);
    console.log(favorites);
    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
          favoriteBtnEl.classList = "button is-info is-light";
          favoriteBtnEl.textContent = "Remove from Watchlist";
          break;
        }
      }
}
 
loadFavorites();
movieInfo();
castInfo();
favoriteBtnEl.addEventListener("click", favoritesHandler);
