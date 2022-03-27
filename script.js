let picture = document.getElementById('picture');
let timer =  document.getElementById('timer');
let distance =  document.getElementById('distance');
let coordo = document.getElementById('coordo');

var t = 0;
var d = 1000;

function time(){
    t=t+1
    
    var h= String(~~(t/3600));
    if(h.length==1){h=('0'+h)};

    var m= String((~~(t/60))%60);
    if(m.length==1){m=('0'+m)};
    
    var s= String((t%60));
    if(s.length==1){s=('0'+s)};

    timer.innerHTML = ('Time: '+String(h)+':'+String(m)+':'+String(s));
};

function end(){
    share= confirm('Well done! You have won!\nScore: ...\n\nWould you like to share your score?')
    location.reload();
};


picture.src='https://www.mapillary.com/embed?image_key=550092599700936&style=photo';


distance.innerHTML = ('Distance: '+d+' m');

addEventListener("keyup", function(event){
    if (event.keyCode === 13) {d=d-100; distance.innerHTML = ('Distance: '+d+' m'); if(d<=5){end()}}
});

picturesetInterval(time, 1000);