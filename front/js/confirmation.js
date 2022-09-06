/*
Script Porjet OpenClassrooms n°05 Kanap
par Manuel MILLET le 06 septembre à 18h00
Script de la page confirmation.html pour l'affichage dynamique de produits
*/

// La fonction "getOrderId" recherche et retourne le numero de commande "orderId" transmi via l'url par la page cart.html
function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get("orderId");
    return orderId;
}

// La fonction "displayErrorStyle" modifie la couleur de fond en rouge de l'élément html qui indique le "orderId" si il n'est pas valide"
function displayErrorStyle () {
	document.querySelector(".confirmation p").style.background = "red";
	document.querySelector(".confirmation p").innerHTML = "Numéro de commande invalide !";
}

// La fonction "displayValidStyle" modifie la couleur de fond en vert de l'élément html ".confirmation p" et affiche le numero de commande "orderId" dans la page confirmation.html
// 
function displayOrderId (orderId) {
    document.querySelector(".confirmation p").style.background = "green";
    document.querySelector(".confirmation p").style.color = "white";
    document.getElementById("orderId").innerHTML = orderId;
}

//************************ Programme principal *******************************/
// Il récupère et affiche (si il est valide) le numéro de commande, puis vide le panier dans localStorage
const orderId = getOrderId();// recherche le numéro de commande
if (orderId === null || orderId === undefined || orderId === "" || typeof(orderId) != 'string') {
    alert('Le numero de commande n\'est pas valide, merci de refaire votre commande !');
    displayErrorStyle();//La fonction "displayErrorStyle" modifie la couleur de fond en rouge de l'élément html qui indique le "orderId" si il n'est pas valide"
}else{
    displayOrderId(orderId);//La fonction "displayOrderId" afffiche le numéro de commande et modifie la couleur de fond en vert de l'élément html qui indique que  "orderId" est bien valide
}
//Suppression de tout les produits du panier dans localStorage
localStorage.clear();
// Fin de l'application "KANAP"