import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();
console.log(process.env);


let reportAcudits:{
    joke: string;
    score: number;
    date: string;
    }[ ] = [];

let sActualJoke:string;

function JokeExist():boolean{

    let jokeExist=reportAcudits.filter( (item) => item.joke == sActualJoke );
    if(jokeExist.length===0)
        return false;
    else
        return true;
}   

function JokeRated():boolean{

    let jokeRated=reportAcudits.filter( (item) => item.joke == sActualJoke && item.score>0);
    if(jokeRated.length===0)
        return false;
    else
        return true;
}

function ButtonStatus(){
    var element = document.getElementById('currentJoke');
    if(element && element.innerText!="")
    {
        document.getElementById('score1_btn').classList.remove('disabled');
        document.getElementById('score2_btn').classList.remove('disabled');
        document.getElementById('score3_btn').classList.remove('disabled');
        if(JokeRated())
        {
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

function JokeFetch_dad(){
    console.log("dad_joke");
    fetch('https://icanhazdadjoke.com/', {
        method: "GET",
        headers: {"Accept": 'application/json'  }})
        .then(response => response.json())
        .then(json => {
                        document.getElementById("currentJoke").innerText = json.joke;
                        sActualJoke=json.joke;
                        // console.log(json);
                    })
        .then( () => ButtonStatus())
        .catch( () => {console.log("Error en la llamada a la API")});
}

function JokeFetch_chuck(){
    console.log("chuck_joke");
    fetch('https://api.chucknorris.io/jokes/random', {
        method: "GET"})
        .then(response => response.json())
        .then(json => {
                        document.getElementById("currentJoke").innerText = json.value;
                        sActualJoke=json.value;
                        // console.log(json);
                    })
        .then( () => ButtonStatus())
        .catch( () => {console.log("Error en la llamada a la API")});
}

function JokeFetch_Geek(){
    console.log("geek_joke");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f561f8d62msh317d8f745c6a5dbp1fb206jsnb656500f06e9',
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
        }
    };
    
    fetch('https://geek-jokes.p.rapidapi.com/api?format=json', options)
        .then(response => response.json())
        .then(json => {
                        document.getElementById("currentJoke").innerText = json.joke;
                        sActualJoke=json.joke;
                        // console.log(json);
        })
        .then( () => ButtonStatus())
        .catch(err => console.error(err));
}


function NextJoke():void {

    let iAux = Math.floor(Math.random() * 3);
    console.log(iAux);

    switch (iAux) {
        case 0:
            JokeFetch_dad();            
            break;
        case 1:
            JokeFetch_chuck();        
            break;
        case 2:
            JokeFetch_Geek();    
            break;
        default:
            break;
    }
    NextImage(iAux+1);
}

function NextImage(iIndex:number):void{
    let div_main:HTMLElement  = document.getElementById("main");
    let url = "./images/blob-"+iIndex+".svg";
    div_main.style.backgroundImage = 'url(' + url + ')';
    console.log(url);
}

function Score(iScore:number) {
    // console.log("La puntuación ha sido " + iScore);
    sActualJoke=document.getElementById("currentJoke").innerText;
    const d:Date = new Date();
    let sDate = d.toISOString();
    if(sActualJoke != "")
    {
        reportAcudits.push({joke: sActualJoke, score: iScore ,date: sDate});
        ButtonStatus();
        console.log(reportAcudits);
    }
}


function GetWeather(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f561f8d62msh317d8f745c6a5dbp1fb206jsnb656500f06e9',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=41.40253730187383,2.1943496844605224', options)
        .then(response => { console.log(response);
                            return response.json();})
        .then(json => {
            document.getElementById("weather_txt").innerText = json['current'].temp_c +"ºC, "+ json['current']['condition'].text;
            let image:HTMLImageElement  = document.getElementById("weather_ico");
            image.src = json['current']['condition'].icon.replace('//','http://');
            console.log(json['current']['condition'].icon);
        })    
        .catch(err => console.error(err));
}
