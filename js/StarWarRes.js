let dataGlobal = [];
let planetsGlobal = [];
let starshipGlobal = [];
let peoplesGlobal = [];

window.onload = function getData(){
    const url = "https://swapi.dev/api/films/";
    fetch(url,{'Access-Control-Allow-Credentials': true}) 
    .then(response => response.json()).then(data => loadData(data))
    .catch((err) => console.log(err))
}


function loadData(data){
    const table = document.getElementById('tableStar');
    const movies = data.results
    let dataMovie = [];

    for (movieAttributes of movies) {
        const numMovie = {
                          id:movieAttributes.episode_id,
                          title: movieAttributes.title,
                          planets: movieAttributes.planets,
                          peoples: movieAttributes.characters,
                          starships: movieAttributes.starships
                        }
        dataMovie.push(numMovie);
    }   

        dataMovie.map((Attribute) => {
            const fila = document.createElement("tr"); 
            const columna = document.createElement("td"); 
            const btnDetalle = document.createElement("td"); 
            const detalle = document.createElement("button"); 
            detalle.innerHTML = 'ver detalle';
            detalle.setAttribute("onclick", "getDetail(this)");
            detalle.className = "btn btn btn-info";
            detalle.value = Attribute.id;
            const titleMovie = document.createTextNode(Attribute.title); 
            columna.appendChild(titleMovie);
            fila.appendChild(columna);
            fila.appendChild(btnDetalle);
            btnDetalle.appendChild(detalle);
            table.appendChild(fila);
        });
        dataGlobal = dataMovie;
        
}

function getDetail(e){
    const table = document.getElementById('tableStar');
    const btnLoad = document.getElementById('btnLoad');
    const load = document.getElementById('load');
    const idMovie = Number(e.value);
    const movieDetalle = dataGlobal.find(element => element.id === idMovie);
    table.style.display='none'
    btnLoad.classList.remove("displayComponent");
    load.classList.remove("displayComponent");

   if(!detalleData(movieDetalle)){
        showData()
   };
}


function detalleData(movieDetalle){
    peoplesData(movieDetalle.peoples);
    planetsData(movieDetalle.planets);
    starshipsData(movieDetalle.starships);
}

function peoplesData(peoples){
    let peoplesData = [];
    for (peoplesApi of peoples) {
        fetch(peoplesApi,{'Access-Control-Allow-Credentials': true}) 
        .then(response => response.json()).then(data =>  
           peoplesData.push({name: data.name, 
            gender:data.gender, 
            hair_color:data.hair_color, 
            skin_color:data.skin_color, 
            eye_color:data.eye_color, 
            height:data.height, 
            homeworld:data.homeworld}))
        .catch((err) => console.log(err))
    }  
    peoplesGlobal = peoplesData;
}


function planetsData(planets){
    let planetsData = [];
    for (planetsApi of planets) {
        fetch(planetsApi,{'Access-Control-Allow-Credentials': true}) 
        .then(response => response.json()).then(data =>  
            planetsData.push({name:data.name,
            terrain: data.terrain,
            gravity: data.gravity,
            diameter: data.diameter,
            population: data.population },
            ))
        .catch((err) => console.log(err))
    }
    planetsGlobal = planetsData;

}


function starshipsData(starships){
    let starshipsData = [];
    for (starshipsApi of starships) {
        fetch(starshipsApi,{'Access-Control-Allow-Credentials': true}) 
        .then(response => response.json()).then(data =>  
            starshipsData.push({name: data.name, 
                model: data.name, 
                manufacturer:data.manufacturer, 
                passengers: data.passengers,
                length: data.length}))
        .catch((err) => console.log(err))
    }

    starshipGlobal = starshipsData;
 
}


function showData(){ 
    const tablePeople = document.getElementById('tablePeople');
    const tablePlanets = document.getElementById('tablePlanets');
    const tableNave = document.getElementById('tableNave'); 
   
    setTimeout(function(){ 
        planetsGlobal.map((Attribute) => {
            const fila = document.createElement("tr"); 
            const name = document.createElement("td"); 
            const titleMovie = document.createTextNode(Attribute.name); 
            name.appendChild(titleMovie);
            fila.appendChild(name);
            tablePlanets.appendChild(fila);
        });

        peoplesGlobal.map((Attribute) => {
            const fila = document.createElement("tr"); 
            const name = document.createElement("td"); 
            const titleMovie = document.createTextNode(Attribute.name); 
            name.appendChild(titleMovie);
            fila.appendChild(name);
            tablePeople.appendChild(fila);
        });

            starshipGlobal.map((Attribute) => {
            const fila = document.createElement("tr"); 
            const name = document.createElement("td"); 
            const titleMovie = document.createTextNode(Attribute.name); 
            name.appendChild(titleMovie);
            fila.appendChild(name);
            tableNave.appendChild(fila);
        });

        const load = document.getElementById('load');
        load.classList.add("displayComponent");

     }, 4000);

}

function load(){
    window.location.reload(); 
}
