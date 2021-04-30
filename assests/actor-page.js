var headShotEl = document.querySelector("#head-shot");
var actorInfoEl = document.querySelector("#actor-info");
var showsEl = document.querySelector("#shows");

var id = 976;
var imgPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";

var actorInfo = function (){
    apiUrl = "https://api.themoviedb.org/3/person/" + id +"?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                var headShotImg = document.createElement("img");
                headShotImg.setAttribute("src",imgPath + data.profile_path);
                headShotEl.appendChild(headShotImg);
                var actorDetails = document.createElement("div");
                actorDetails.innerHTML = "<h2 class='title'>" + data.name + "</h2><p class = 'subtitle'>" + data.birthday + "</p><p class = 'content'>" + data.biography + "</p>";
                actorInfoEl.appendChild(actorDetails);
            });
        } else{};

    });
}

var knownFor = function (){
    apiUrl = "https://api.themoviedb.org/3/person/" + id +"/combined_credits?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                for (var i = 0; i < Math.min(data.cast.length, 10); i++) {
                    var cardEl = document.createElement("div");
                    // cardEl.setAttribute("href", "#");
                    cardEl.className = "card column m-2 p-0 is-one-quarter is-one-third-mobile is-clipped";
                    var cardHeaderEl = document.createElement("header");
                    cardHeaderEl.classList = "card-header is-shadowless";
                    cardHeaderEl.innerHTML = "<p class = 'card-header-title is-centered'>" + data.cast[i].title + "</p>";
                    

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
                    cardFooterEl.innerHTML = "<button class='button card-footer-item is-info'> Save to Favorites</button>";
                    var movieLinkEl = document.createElement("a");
                    movieLinkEl.setAttribute("href","#");
                    cardEl.appendChild(cardFooterEl);
                    movieLinkEl.appendChild(cardImageEl);
                    movieLinkEl.appendChild(cardHeaderEl);
                    cardEl.appendChild(movieLinkEl);
                    showsEl.appendChild(cardEl);
                  }
            });
        } else{};

    });
}

actorInfo();
knownFor();
