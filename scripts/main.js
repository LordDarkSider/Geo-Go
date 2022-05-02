const picture = document.getElementById('picture');
const timer =  document.getElementById('timer');
const distance =  document.getElementById('distance');
const coordo = document.getElementById('coordo');
const credits = document.getElementById('credits');

var t;
var d;
var d_dep = null;
var p = new Object();
var target = new Object();
var image_author;
var first;

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
    coordo.innerHTML = "Latitude: " + p.lat + "<br>Longitude: " + p.lon;

    //si début de partie : renvoyer la position au programme de Nathan
    if (first){
        first = false;
        //...
    }
    else if (target.coord.latitude != null){request_distance};
};

function request_distance(){
    //requete de la distance au programme de Nathan en lui envoyant comme paramètres coordo position et cible
    d = distance([p.lat,p.lon],[target.coord.latitude,target.coord.longitude]);
    distance.innerHTML = ('Distance: '+d+' m');
    if(d_dep == null){d_dep = d};
    if(d<=6){end()};
};

function geoerror(error){
    alert("Géolocalisation impossible ! Veuillez activer la géolocalisation.");
    geolocalisation()
};


// fonction appellée par la programme d'Hadrien qui prendra en paramètres les coordo de la cible, la source de l'image et son créateur
function set_target(coordo, img_src, author){
    target.coord.latitude = //...
    target.coord.longitude = //...

    picture.onload = function(){setInterval(time, 1000)};
    picture.onerror = function(){location.reload()};
    picture.src= img_src;
    image_author= author;
    credits.insertAdjacentHTML("afterbegin", "Image founie par "+image_author+" sur mapillery.");

    request_distance;
};


function init(){
    t = 0;
    d = 0;
    target.coords.latitude = null;
    target.coords.longitude = null;
    target.image.src = null;
    target.image.author = null;
    image_author = '...';
    first = true;
    picture.src='';
    geolocalisation();
};


// à supprimer plus tard
addEventListener("keyup", function(event){
    if (event.keyCode === 13) {d=d-100; distance.innerHTML = ('Distance: '+d+' m'); if(d<=5){end()}}
});

init;