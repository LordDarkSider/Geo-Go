from math import *

def distance(A:list,B:list):
    '''Calcule la distance en km entre deux points sur Terre
    A et B sont les couples (listes) de coordonnées (latitude, longitude) en degrés des 2 points
    '''
    r = 6378.137 #rayon de la Terre en km
    A[0],A[1],B[0],B[1] = radians(A[0]), radians(A[1]), radians(B[0]), radians(B[1])

    # distance orthodromique (formule de har)
    d = 2* r* asin(sqrt( sin((B[0]-A[0])/2)**2 + ( cos(A[0]) * cos(B[0]) * (sin((B[1]-A[1])/2)**2) ) ))

    return round(d,2)