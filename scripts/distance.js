function deg2rad(x){
    ///Convertit degrés en radians
    return x*(Math.PI/180)
};

function distance(A,B){
    ///Calcule la distance en m entre deux points sur Terre
    ///A et B sont les couples (listes) de coordonnées (latitude, longitude) en degrés des 2 points

    let r = 6378137; //rayon de la Terre en km
    A[0] = deg2rad(A[0])
    A[1] = deg2rad(A[1])
    B[0] = deg2rad(B[0])
    B[1] = deg2rad(B[1])

    //distance orthodromique (formule de haversine)
    let d = 2* r* Math.asin(Math.sqrt( Math.pow(Math.sin((B[0]-A[0])/2),2) + ( Math.cos(A[0]) * Math.cos(B[0]) * Math.pow((Math.sin((B[1]-A[1])/2)),2) ) ));

    return Math.round(d,2);
};