/*
Script Porjet OpenClassrooms n°05 Kanap
par Manuel MILLET le 03 septembre à 18h00
Script de la page confirmation.html pour l'affichage dynamique de produits
*/

// La fonction "getOrderId" recherche et retourne le numero de commande "orderId" transmi via l'url par la page cart.html
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

// La fonction "displayOrderId" affiche le numero de commande "orderId" dans la page confirmation.html
function displayOrderId (orderId) {
    document.getElementById("orderId").innerHTML = orderId;
}

// La fonction "displayErrorStyle" modifie la couleur de fond en rouge de l'élément html qui indique le "orderId" si il n'est pas valide"
function displayErrorStyle () {
	document.querySelector(".confirmation p").style.background = "red";
	document.querySelector(".confirmation p").innerHTML = "Numéro de commande invalide !";
}

// La fonction "displayValidStyle" modifie la couleur de fond en vert (pendant 4s) de l'élément html qui indique le "orderId" si il est valide"
function displayValidStyle () {
    document.querySelector(".confirmation p").style.background = "green";
    document.querySelector(".confirmation p").style.color = "white";
}

//************************ Programme principal *******************************/
// Il récupère, retourne et affiche le numero de commande, puis vide le panier dans localStorage
const orderId = getOrderId();// recherche le numéro de commande
displayOrderId(orderId);// La fonction "displayOrderId" affiche le numero de commande "orderId" dans la page confirmation.html
//Suppression de tout les produits du panier dans localStorage
localStorage.clear();
// Fin de l'application "KANAP"