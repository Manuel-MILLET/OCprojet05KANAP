/*
Script Porjet OpenClassrooms n°05 Kanap
par Manuel MILLET le 31 août à 12h00
Script de la page confirmation.html pour l'affichage dynamique de produits
*/

// fonction "getOrderId" recherche et retourne le numero de commande transmi via l'url par la page cart.html
function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get("orderId");
    if (orderId === null || orderId === undefined || orderId === "" || typeof(orderId) != 'string') {
        alert('Le numero de commande n\'est pas valide, merci de refaire votre commande !');
        displayErrorStyle();
        return "";
    }else{
        displayValidStyle ();
        return orderId;
    }
}
// fonction "displayOrderId" affiche le numero de commande "orderId" dans la page confirmation.html
function displayOrderId (orderId) {
    document.getElementById("orderId").innerHTML = orderId;
}
// fonction "displayErrorStyle" modifie la couleur de fond en rouge de l'élément html qui indique le "orderId" si il n'est pas valide"
function displayErrorStyle () {
	document.querySelector(".confirmation p").style.background = "red";
	document.querySelector(".confirmation p").innerHTML = "Numéro de commande invalide !";
}
//fonction "displayValidStyle" modifie la couleur de fond en vert (pendant 4s) de l'élément html qui indique le "orderId" si il est valide"
function displayValidStyle () {
    document.querySelector(".confirmation p").style.background = "green";
    document.querySelector(".confirmation p").style.color = "white";
}


//Programme principal, retourne et affiche le numero de commande, puis vide le panier dans localStorage
const orderId = getOrderId();
displayOrderId(orderId);
//Suppression de tout les produits du panier dans localStorage
localStorage.clear();