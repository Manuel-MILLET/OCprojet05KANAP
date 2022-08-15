/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 15 août 2022 14h00
ce fichier contient les classes "Canape".
*/
//*********************************************************************************************************************************************************************************************//
// La classe "Canape" contient les propriétés et les méthodes des produits représentant les canapés disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//*********************************************************************************************************************************************************************************************//
class ProductUser {
    constructor() {
        let basket = localStorage.getItem("cartUser");// "cart" représente l'objet au format tableau qui contient tout le panier du client
        if (basket == null) {
            this.basket = [];
            localStorage.setItem("cartUser",JSON.stringify(this.basket));
            alert('Le panier est actuelement vide, cliquez sur "OK" pour continuer, et faire votre choix  !');
        }else{
            this.basket = JSON.parse(basket);
        }
    }

    // Cette méthode "addToCart" ajoute le canape selectionné par le client dans le panier
    // "localStorage".
    addToCart(idOfProduct,nameButton) {
        const element = document.getElementById(nameButton);
        element.addEventListener('click', function() {// Attente de l'evenemnt "click" sur le bouton "nameButton" par l'utilisateur pour la selection du canapé
        let check = true;// check est un flag qui signale une saisie correcte
        let qty = Number.parseInt(Number(quantity.value));
        let testInteger = Number.isInteger(Number(quantity.value));
            // test de la validité pour la saisie de la couleur
            if (colors.value == '' || colors.value == null || colors.value == undefined || typeof(colors.value) != "string") {
                alert('Le choix de la couleur n\'est pas correct, merci de recommencer !');
                check = false;
            }
            // test de la validité de la saisie de la quantité
            if (qty <= 0 || qty > 100 || qty == null || qty == undefined || typeof(qty) != "number" || !testInteger) {
                alert('La quantité doit être un nombre entier compris entre 1 et 100, merci de recommencer !');
                check = false;
            }
            // test (check) saisie ok => check = true sinon check = false
            if (check) {
                let choiceProduct = {id:idOfProduct, color:colors.value, quantity:qty};
                let cartUser = JSON.parse(localStorage.getItem("cartUser"));
                let cartLength = cartUser.length;
                if (cartUser == null) {
                    cartUser = [];
                    localStorage.setItem("cartUser",JSON.stringify(cartUser));
                    alert('Votre panier est actuelement vide, cliquez sur "OK" pour continuer, et faire votre choix  !');
                }
                // Si le panier dans localStorage exsiste et si il est vide alors on ajoute le choix du client au panier
                if (cartUser && cartLength <= 0){
                    cartUser.push(choiceProduct);
                    localStorage.setItem("cartUser",JSON.stringify(cartUser));
                    alert('Mise à jour de votre panier, cliquez sur "OK" pour continuer !');
                    let infoCartUser = new ProductUser();
                    let nbCanape = infoCartUser.getNumberProduct();
                    alert('Dans votre panier il y a : '+nbCanape+' Canapé(s)');
                }else{
                    let update = true;
                    for (let indice in cartUser) {
                        // si le produit choisi par le client et un produit dans le panier ont le même id
                        if (cartUser[indice].id != undefined && choiceProduct.id != undefined && cartUser[indice].id == choiceProduct.id) { 
                            // si le produit choisi et le produit enregistré dans le panier ont le même id et la même couleur 
                            if (cartUser[indice].color != undefined && choiceProduct.color != undefined && cartUser[indice].color == choiceProduct.color) {
                                // si la quantité cumulée est négative alors on supprime le choix du client du panier
                                if (cartUser[indice].quantity <= 0) {
                                    alert('Désolé, mais une quatité négative n\'est pas possible, le produit est supprimé de votre panier !');
                                    cartObject.removeChoiceUser(indice);// si la quantité cumulé est négative on supprime le produit d'indice "indice" du panier 
                                }else{// ici il y a déjà un canapé enregistré avec le même ID et la même couleur, donc on cumul les deux quantités(canapé choisi et canapé enregistré)
                                    cartUser[indice].quantity += choiceProduct.quantity;
                                    localStorage.setItem("cartUser",JSON.stringify(cartUser));
                                    alert('Mise à jour de votre panier, cliquez sur "OK" pour continuer !',);
                                    let infoCartUser = new ProductUser();
                                    let nbCanape = infoCartUser.getNumberProduct();
                                    alert('Dans votre panier il y a : '+nbCanape+' Canapé(s)');
                                    update = false;
                                    break;
                                }
                            }
                        }
                    }
                    if (update == true) {
                        cartUser.push(choiceProduct);
                        localStorage.setItem("cartUser",JSON.stringify(cartUser));
                        alert('Mise à jour de votre panier, cliquez sur "OK" pour continuer !',);
                        let infoCartUser = new ProductUser();
                        let nbCanape = infoCartUser.getNumberProduct();
                        alert('Dans votre panier il y a : '+nbCanape+' Canapé(s)');
                    }
                }
            }else{
                check = true;
            } // Fin de la condition check saisie
        })// Fin de addEventListener
    }// Fin de la méthode addToCart

    getNumberProduct(){
        let number = 0 ;
        for (let product of this.basket ){
            number += product.quantity;
        }
        console.log('Il y a :=>',number,'Canape(s) dans le panier');
        return number;
    }
}
/*
    save(){
        localStorage.setItem("cartUser",JSON.stringify(this.basket));
        alert('Mise à jour de votre panier, cliquez sur "OK" pour continuer !');
    }
 

    display(){
        console.log('ICI LA FONCTION DISPLAY AFFFICHE LE PANIER DANS LA CONSOLE FONCTION DISPLAY this.basket LIGNE 12',this.basket);
    }

    remove(product){
        this.basket = this.basket.filter(p => p.id != product.id);
        this.save();
    }

    getTotalPrice(){
        let total = 0 ;
        for(let product of this.basket) {
            total += product.quantity * product.price;
        }
        console.log('Somme total du panier =>',total,' €');
        return total;
    }

    add(product){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity++;
        }else{
            product.quantity = 1;
            this.basket.push(product);
        }
        this.save();
    }
    
    changequantity(product,quantity){
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            }else{
                this.save();
            }
        }
    }

*/