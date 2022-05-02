const picture = document.getElementById('picture');
const timer =  document.getElementById('timer');
const info_distance =  document.getElementById('distance');
const info_coordo = document.getElementById('coordo');
const credits = document.getElementById('credits');



function time(){
    t=t+1
    
    var h= String(~~(t/3600));
    if(h.length==1){h=('0'+h)};

    var m= String((~~(t/60))%60);
    if(m.length==1){m=('0'+m)};
    
    var s= String((t%60));
    if(s.length==1){s=('0'+s)};

    timer.innerHTML = ('Temps: '+String(h)+':'+String(m)+':'+String(s));
};


function create_target(){
	//utilise fonctions de mapillary.js
	target.id = getAroundImage(p.lat,p.lon)
	
	target.image.src = getImageLink(target.id);
	//target.image.author = ;
	
	//target.coord.lat = ...
    //target.coord.lon = ...
	
	picture.onload = function(){setInterval(time, 1000)};
    picture.onerror = function(){location.reload()};
    picture.src= target.image.src;
    credits.insertAdjacentHTML("afterbegin", "Image founie par "+target.image.author+" sur mapillery.");

    request_distance;
};


function end(){
    var score = Math.ceil((d_dep/t)*100)
    share= confirm('Bravo ! Vous avez gagné !\nScore: '+score+'\n\nVoulez-vous partagez votre score ?')
    location.reload();
};


function geolocalisation(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(changePosition,geoerror);
    }
    else {geoerror}
};


function changePosition(position) {
    
    p.lat = position.coords.latitude;
    p.lon = position.coords.longitude;
    info_coordo.innerHTML = "Latitude: " + p.lat + "<br>Longitude: " + p.lon;
	
	//si début de partie
    if (first){
        first = false;
        create_target()
    }
	
	else if (target.coord.lat != null){request_distance};
};

function request_distance(){
    //requete de la distance au programme de Nathan en lui envoyant comme paramètres coordo position et cible
    d = distance([p.lat,p.lon],[target.coord.lat,target.coord.lon]);
    info_distance.innerHTML = ('Distance: '+d+' m');
    if(d_dep == null){d_dep = d};
    if(d<=6){end()};
};

function geoerror(error){
    alert("Géolocalisation impossible ! Veuillez activer la géolocalisation.");
    geolocalisation()
};



// à supprimer plus tard
addEventListener("keyup", function(event){
    if (event.keyCode === 13) {d=d-100; distance.innerHTML = ('Distance: '+d+' m'); if(d<=5){end()}}
});




//initialisation
var t= 0;
var d= 0;
var d_dep = null;
var first = true;

var p = new Object(); p.lat = null; p.lon = null;

var target = new Object(); 
target.id = null; 
target.coord = new Object(); target.coord.lat = null; target.coord.lon = null;
target.image = new Object(); target.image.src = null; target.image.author = null;

picture.src='';

geolocalisation();