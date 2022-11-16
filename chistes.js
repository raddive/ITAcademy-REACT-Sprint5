function NextJoke() {
    fetch('https://icanhazdadjoke.com/', {
        method: "GET",
        headers: { "Accept": 'application/json' }
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        document.getElementById("currentJoke").innerText = json.joke;
        console.log(json);
    })["catch"](function () { console.log("Error en la llamada a la API"); });
}
