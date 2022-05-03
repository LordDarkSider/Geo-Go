let token = "MLY%7C5325123934178934%7Cdbf72ed670e52b736c5927bd0ac0a4d9";
let URL = "https://graph.mapillary.com/";

function getBox(x,y){
    let a = x*Math.cos(y*Math.PI/180);
    let b = Math.cos(y*Math.PI/180);
    let x1 = (a+0.0026949577340795)/b;
    let y1 = y - 0.0026949577340795;
    let x2 = (a-0.0026949577340795)/b;
    let y2 = y + 0.0026949577340795;
    /*x1 = Math.ceil(x1*1000)/1000;
    y2 = Math.ceil(y2*1000)/1000;
    x2 = Math.floor(x2*1000)/1000;
    y1 = Math.floor(y1*1000)/1000;*/
    return [y1, x2, y2, x1];
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getAroundImage(posX,posY){
    let textGet = httpGet(URL + "images?access_token=" + token + "&fields=id&bbox=" + getBox(posX,posY)+"&limit=30");
    let recieved = JSON.parse(textGet);
    let IDArray = recieved.data;
    if (IDArray==undefined){
        return -1;
    } else if (IDArray.length==0){
        return 0;
    } else {
        let IDJSON = IDArray[Math.floor((Math.random()*IDArray.length))];
        let IDINT = parseInt(IDJSON.id);
        console.log(IDINT);
        return IDINT;
    }
}

function getImageLink(imageID){
    let textGet = httpGet(URL + imageID + "?access_token=" + token + "&fields=thumb_2048_url");
    let recieved = JSON.parse(textGet);
    let link = recieved.thumb_2048_url;
    if (link == undefined){
        return "error";
    } else {
        return link;
    }
}

function getImageCoordinates(imageID){
    let textGet = httpGet(URL + imageID + "?access_token=" + token + "&fields=geometry");
    let recieved = JSON.parse(textGet);
    let coord = recieved.geometry.coordinates;
    if (coord == undefined){
        return "error"
    } else {
        return coord;
		//coord : liste [lat,lon]
    }
}