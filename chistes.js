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
function NextJoke() {
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
