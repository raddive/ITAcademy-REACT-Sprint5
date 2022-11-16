
//Implementación con FETCH y PROMISES
function NextJoke():void {

    fetch('https://icanhazdadjoke.com/', {
        method: "GET",
        headers: {"Accept": 'application/json'  }})
        .then(response => response.json())
        .then(json => {
                        document.getElementById("currentJoke").innerText = json.joke;
                        // console.log(json);
                    })
        .catch( () => {console.log("Error en la llamada a la API")});
}