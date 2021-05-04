var favList = document.querySelector("#fav-list");
const multiContainerEl = document.querySelector("#multi-container");


favoritesDisplay();

function favoritesDisplay() {
  for (i = 0; i < favorites.length; i++) {
    movieInfo(favorites[i].id, favorites[i].type);
  }
}

async function movieInfo(id, type) {
  console.log(type);
  const apiUrl =
    "https://api.themoviedb.org/3/" +
    type +
    "/" +
    id +
    "?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";

  const response = await fetch(apiUrl);

  if (response.ok) {
    const data = await response.json();

    const multiEl = document.createElement("div");
    multiEl.classList = "list-item flex-row justify-space-between align-center";
    const cardEl = displayMovie(data);
    multiContainerEl.appendChild(cardEl);
  }
}

// fetch(apiUrl).then(function (response) {
// console.log(response);
// if (response.ok) {
// response.json().then(function (data) {
// console.log(data);
// for (var i = 0; i < data.length; i++) {
// create a container for each search
// var multiEl = document.createElement("div");
// multiEl.classList =
// "list-item flex-row justify-space-between align-center";
// Logic to display appropriate information based on mediatype of movie, TV or actor
// mediaType = data[i].media_type;
// if (mediaType === "person") {
// var cardEl = displayActor(multi[i]);
// } else {
// var cardEl = displayMovie(multi[i]);
// }
// var cardEl = displayMovie(data);
// append container to the dom
// multiContainerEl.appendChild(cardEl);
// }
// });
// }
// });
