var reportAcudits = [];
var sActualJoke;
function JokeExist() {
    var jokeExist = reportAcudits.filter(function (item) { return item.joke == sActualJoke; });
    if (jokeExist.length === 0)
        return false;
    else
        return true;
}
function JokeRated() {
    var jokeRated = reportAcudits.filter(function (item) { return item.joke == sActualJoke && item.score > 0; });
    if (jokeRated.length === 0)
        return false;
    else
        return true;
}
function ButtonStatus() {
    var element = document.getElementById('currentJoke');
    if (element && element.innerText != "") {
        document.getElementById('score1_btn').classList.remove('disabled');
        document.getElementById('score2_btn').classList.remove('disabled');
        document.getElementById('score3_btn').classList.remove('disabled');
        if (JokeRated()) {
            document.getElementById('next_btn').classList.remove('disabled');
            document.getElementById('score1_btn').classList.add('disabled');
            document.getElementById('score2_btn').classList.add('disabled');
            document.getElementById('score3_btn').classList.add('disabled');
        }
        else
            document.getElementById('next_btn').classList.add('disabled');
    }
}
//Implementación con FETCH y PROMISES
function JokeFetch_dad() {
    console.log("dad_joke");
    fetch('https://icanhazdadjoke.com/', {
        method: "GET",
        headers: { "Accept": 'application/json' }
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        document.getElementById("currentJoke").innerText = json.joke;
        sActualJoke = json.joke;
        // console.log(json);
    })
        .then(function () { return ButtonStatus(); })["catch"](function () { console.log("Error en la llamada a la API"); });
}
function JokeFetch_chuck() {
    console.log("chuck_joke");
    fetch('https://api.chucknorris.io/jokes/random', {
        method: "GET"
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        document.getElementById("currentJoke").innerText = json.value;
        sActualJoke = json.value;
        // console.log(json);
    })
        .then(function () { return ButtonStatus(); })["catch"](function () { console.log("Error en la llamada a la API"); });
}
function JokeFetch_Geek() {
    console.log("geek_joke");
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f561f8d62msh317d8f745c6a5dbp1fb206jsnb656500f06e9',
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    };
    fetch('https://geek-jokes.p.rapidapi.com/api?format=json', options)
        .then(function (response) { return response.json(); })
        .then(function (json) {
        document.getElementById("currentJoke").innerText = json.joke;
        sActualJoke = json.joke;
        // console.log(json);
    })
        .then(function () { return ButtonStatus(); })["catch"](function (err) { return console.error(err); });
}
function NextJoke() {
    var iAux = Math.floor(Math.random() * 10);
    if (iAux >= 0 && iAux < 3)
        JokeFetch_dad();
    else if (iAux >= 3 && iAux < 7)
        JokeFetch_chuck();
    else if (iAux >= 7 && iAux < 9)
        JokeFetch_Geek();
}
function Score(iScore) {
    // console.log("La puntuación ha sido " + iScore);
    sActualJoke = document.getElementById("currentJoke").innerText;
    var d = new Date();
    var sDate = d.toISOString();
    if (sActualJoke != "") {
        reportAcudits.push({ joke: sActualJoke, score: iScore, date: sDate });
        ButtonStatus();
        console.log(reportAcudits);
    }
}
function GetWeather() {
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f561f8d62msh317d8f745c6a5dbp1fb206jsnb656500f06e9',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=41.40253730187383,2.1943496844605224', options)
        .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (json) {
        document.getElementById("weather_txt").innerText = json['current']['condition'].text;
        var image = document.getElementById("weather_ico");
        image.src = json['current']['condition'].icon.replace('//', 'http://');
        console.log(json['current']['condition'].icon);
    })["catch"](function (err) { return console.error(err); });
}
