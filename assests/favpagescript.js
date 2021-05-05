var favList = document.querySelector("#fav-list");
const multiContainerEl = document.querySelector("#multi-container");

function favoritesDisplay() {
  if (favorites.length === 0) {
    multiContainerEl.textContent =
      "You have no favorties yet.  Search for movies or shows to add them to you list.";
  } else {
    for (i = 0; i < favorites.length; i++) {
      movieInfo(favorites[i].id, favorites[i].type);
    }
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
    console.log(data);
    const cardEl = displayMovie(data, type);
    multiContainerEl.appendChild(cardEl);
  }
}

favoritesDisplay();
multiContainerEl.addEventListener("click", showSaveHandler);
