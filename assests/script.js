var posterEl = document.querySelector("#poster");
var movieInfoEl = document.querySelector("#movie-info");
var sourcesEl = document.querySelector("#sources");
var castEl = document.querySelector("#cast");
var sources =[{
    id: 203,
    icon: "./assests/img/Netflix.jpg",
},{
    id: 387,
    icon: "./assests/img/HBOMax.jpg",
},{
    id: 372,
    icon: "./assests/img/Disney.jpg",
},{
    id: 157,
    icon: "./assests/img/Hulu.jpg",
},{
    id: 26,
    icon: "./assests/img/AmazonPrime.jpg",
}]

var posterPath = "https://www.themoviedb.org/t/p/w260_and_h390_bestv2";
var id = 550;
var movieInfo = function(id){
    var apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=b7854a2f58fc72f2408614bd5147ec1c&language=en-US";
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            var posterImg = document.createElement("img");
            posterImg.setAttribute("src",posterPath + data.poster_path);
            posterEl.appendChild(posterImg);
            var movieDetails = document.createElement('div');
            movieDetails.innerHTML = "<h2 class='title'>" + data.title + "<span> (" + data.release_date.slice(0,4) + ")</span></h2>";
            var genres = "";
            for (var i=0; i<Math.min(data.genres.length,5); i++){
              genres += data.genres[i].name
              if (i +1 < Math.min(data.genres.length,5)){
                  genres += ", ";
              }
            }
            movieDetails.innerHTML += "<p>" + genres + "</p>";
            movieDetails.innerHTML += "<p>" + data.runtime + " min</p>";
            movieDetails.innerHTML += "<p>" + data.overview + "</p>";
            movieInfoEl.appendChild(movieDetails);
          console.log(data);
        });
    });
}

var sourcesInfo = function(id){
    var apiUrl = "https://api.watchmode.com/v1/search/?apiKey=Mn16itVChM3v7tkB3DIeEwYB6ogYSJiCHvC6jPtC&search_field=tmdb_movie_id&search_value=" + id;
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            var innerApiUrl = "https://api.watchmode.com/v1/title/"+ data.title_results[0].id +"/sources/?apiKey=Mn16itVChM3v7tkB3DIeEwYB6ogYSJiCHvC6jPtC&regions=US";
            fetch(innerApiUrl).then(function(response){
                response.json().then(function(info){
                    var count = 0;

                    for (var i = 0; i< sources.length; i++){
                        console.log (i);

                        for(var index = 0; index < info.length; index++){
                            console.log(sources[i].id,info.length);
                            if (sources[i].id === info[index].source_id){
                                console.log("match");
                                var streamLink = document.createElement("div");
                                streamLink.className = "column";
                                streamLink.innerHTML = "<a href='" + info[index].web_url + "'><img src='" + sources[i].icon + "' alt='Streaming Link'></a>";
                                sourcesEl.appendChild(streamLink);
                                count++;

                            }
                        }
                    }
                    if (count === 0){
                        console.log("no movies");
                       sourcesEl.innerHTML="<p>There are no streaming sources available for this title</p>";
                    }
                   console.log(info);
                });
            });
        });
    });
}
movieInfo(id);