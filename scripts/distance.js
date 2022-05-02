function deg2rad(x){
    ///Convertit degrés en radians
    return x*(Math.PI/180)
};

function distance(A,B){
    ///Calcule la distance en m entre deux points sur Terre
    ///A et B sont les couples de coordonnées (latitude, longitude) en degrés des 2 points

    let r = 6378137; //rayon de la Terre en km
    let x1 = deg2rad(A[0])
    let y1 = deg2rad(A[1])
    let x2 = deg2rad(B[0])
    let y2 = deg2rad(B[1])

    //distance orthodromique (formule de haversine)
    let d = 2* r* Math.asin(Math.sqrt( Math.pow(Math.sin((x2-x1)/2),2) + ( Math.cos(x1) * Math.cos(x2) * Math.pow((Math.sin((y2-y1)/2)),2) ) ));

    return Math.round(d,2);
};