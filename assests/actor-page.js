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

actorInfo();
