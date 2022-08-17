/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 17 août 2022 18h00
ce fichier contient les classes "Canape".
*/
//*********************************************************************************************************************************************************************************************//
// La classe "CartUser" contient les propriétés et les méthodes des produits enregistrés dans le panier du client
//*********************************************************************************************************************************************************************************************//
class CartUser {
    // propriétées de l'objet CartUser
    constructor() {
        let basket = localStorage.getItem("cartUser");// "cart" représente l'objet au format tableau qui contient tout le panier du client
        if (basket == null || basket == undefined) {
            this.basket = [];
            localStorage.setItem("cartUser",JSON.stringify(this.basket));
        }else{
            this.basket = JSON.parse(basket);
        }
    }
    // Méthodes le l'objet CartUser
    //Méthode checkInput ajoute le choix du client au panier si la saie est ok
    addToCart(choiceUser) {// ici choiceUser contient l'id , la  couleur et la quantité choisie par le client
        const cart = new CartUser();
        const cartUser = cart.basket;
        let cartLength = cartUser.length;
        if (cartUser == null || cartUser == undefined || cartLength <= 0) {
            this.saveCartUser(cartUser);
        }
        let update = true;
            for (let indice in cartUser) {
                // si le produit choisi par le client et un produit dans le panier ont le même id
                if (cartUser[indice].id != undefined && choiceUser.id != undefined && cartUser[indice].id == choiceUser.id) { 
                    // si le produit choisi et le produit enregistré dans le panier ont le même id et la même couleur 
                    if (cartUser[indice].color != undefined && choiceUser.color != undefined && cartUser[indice].color == choiceUser.color) {
                        // si la quantité cumulée est négative alors on supprime le choix du client du panier
                        if (cartUser[indice].quantity <= 0) {
                            alert('Désolé, mais une quatité négative n\'est pas possible, le produit est supprimé de votre panier !');
                            this.removeChoiceUser(indice);// si la quantité cumulé est négative on supprime le produit d'indice "indice" du panier 
                        }else{// ici il y a déjà un canapé enregistré avec le même ID et la même couleur, donc on cumul les deux quantités(canapé choisi et canapé enregistré)
                            cartUser[indice].quantity += choiceUser.quantity;
                            this.saveCartUser(cartUser);
                            update = false;
                            break;
                        }
                    }
                }
            }
        if (update == true) {
            cartUser.push(choiceUser);
            this.saveCartUser(cartUser);
        }
    }//fin de la méthode "addToCart"

    saveCartUser(cartUser){
        cartUser.sort();// tri du panier avant la sauvagarde
        localStorage.setItem("cartUser",JSON.stringify(cartUser));
        this.getNumberProduct(cartUser);
        alert('Mise à jour de votre panier, cliquez sur "OK" pour continuer !');
    }

    getNumberProduct(cartUser) {
        let nbCanape = 0 ;
        for (let product in cartUser){
            nbCanape += cartUser[product].quantity;
        }
        return nbCanape;
    }
}// fin de la classe "CartUser"
/*
    removeChoiceUser(indice) {
        console.log(' FONCTION DE SUPPRESSION DU PRODUIT DANS LE PANIER A FAIRE !!!!!');
    }
*/
