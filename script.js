let picture = document.getElementById('picture');
let timer =  document.getElementById('timer');
let distance =  document.getElementById('distance');
let coordo = document.getElementById('coordo');
let credits = document.getElementById('credits');

var t = 0;
var d = 1000;
var image_author = 'SU'

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
    share= confirm('Bravo ! Vous avez gagné !\nScore: ...\n\nVoulez-vous partagez votre score ?')
    location.reload();
};


function geolocalisation(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(changePosition,geoerror);
    } 
    else {geoerror}
};

function changePosition(position) {
    coordo.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    //rajouter code détection si cible atteinte
}

function geoerror(error){
    alert("Géolocalisation impossible !");
    location.reload();
};

picture.src='https://upload.wikimedia.org/wikipedia/commons/5/52/Lycee_descartes.jpg';

credits.insertAdjacentHTML("afterbegin", "Image founie par "+image_author+" sur mapillery.");

distance.innerHTML = ('Distance: '+d+' m');

addEventListener("keyup", function(event){
    if (event.keyCode === 13) {d=d-100; distance.innerHTML = ('Distance: '+d+' m'); if(d<=5){end()}}
});


geolocalisation();

setInterval(time, 1000);