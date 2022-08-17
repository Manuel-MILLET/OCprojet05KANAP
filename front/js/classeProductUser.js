/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 17 août 2022 18h00
ce fichier contient les classes "ProductUser".
*/
//*********************************************************************************************************************************************************************************************//
// La classe "ProductUser" contient les propriétés et les méthodes du produit représentant le produit selectionné par le client dans la page product.html
//*********************************************************************************************************************************************************************************************//
class ProductUser {
    constructor(idOfProduct,colorOfProduct,quantityOfProduct,buttonName) {
        this.idOfProduct = idOfProduct;
        this.colorOfProduct = colorOfProduct;
        this.quantityOfProduct = quantityOfProduct;
        this.buttonName = buttonName;
    }

    // Méthodes de l'objet ProductUser
    // Cette méthode "inputChoice" teste la saisie les informations (couleur et quantité) sur le canapé selectionné par le client dans la page "product.html"
    // puis envoie le choix du client pour l'ajouter au panier dans "localStorage"
    inputChoice(idOfProduct,buttonName) {
        const element = document.getElementById(buttonName);
        element.addEventListener('click', function() {// Attente de l'evenemnt "click" sur le bouton "nameButton" par l'utilisateur pour la selection du canapé
            let qty = Number.parseInt(Number(quantity.value));
            let testInteger = Number.isInteger(Number(quantity.value));
            // test de la validité pour la saisie de la couleur
            if (colors.value == '' || colors.value == null || colors.value == undefined || typeof(colors.value) != "string") {
                alert('Le choix de la couleur n\'est pas correct, merci de recommencer !');
            }
            // test de la validité de la saisie de la quantité
            if (qty <= 0 || qty > 100 || qty == null || qty == undefined || typeof(qty) != "number" || !testInteger) {
                alert('La quantité doit être un nombre entier compris entre 1 et 100, merci de recommencer !');
            }
            let choiceProduct = {id:idOfProduct, color:colors.value, quantity:qty};
            let cartUser = new CartUser();
            cartUser.addToCart(choiceProduct);
        })// Fin de addEventListener
    }// Fin de la méthode inputChoice
}// Fin de la classe "ProductUser"