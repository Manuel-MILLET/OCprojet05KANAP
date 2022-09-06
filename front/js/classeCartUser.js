/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 06 septembre 2022 18h00
*/
//*********************************************************************************************************************************************************************************************//
// La classe "CartUser" contient les propriétés et les méthodes des produits enregistrés dans le panier du client
//*********************************************************************************************************************************************************************************************//
// La classe "CartUser" est définie dans le fichier "classeCartUser.js"
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
    //Méthode "addToCart" ajoute le choix du client au panier
    addToCart(choiceUser) {// ici choiceUser contient l'id , la  couleur et la quantité choisie par le client
        const cart = new CartUser();
        const cartUser = cart.basket;
        let cartLength = cartUser.length;
        if (cartLength == 0) {// si le panier est vide on y ajoute le choix du client
            cartUser.push(choiceUser);
            this.saveCartUser(cartUser);
            this.displayOkInAddTocart ();
        }else{
            let checkUpdate = false;// test de mise à jour en cas de similitude de id et de la couleur ou quantité nulle ou négative
            for (let indice in cartUser) {
                // vérification des quantités négatives
                if (cartUser[indice].quantity <= 0 || choiceUser.quantity <= 0){
                    alert('Désolé, mais une quatité négative n\'est pas possible, la quantité du produit choisi sera mis à 0 dans votre panier !');
                    cartUser[indice].quantity = 0; 
                    this.saveCartUser(cartUser);
                    checkUpdate = true;
                    break;//  la mise à jour a été faite => sortie de la boucle for pour le scan du panier
                }
                // si le produit choisi par le client et un produit dans le panier ont le même id et la même couleur sinon indice suivant
                if (cartUser[indice].id == choiceUser.id && cartUser[indice].color == choiceUser.color) { 
                    // ici il y a déjà un canapé enregistré avec le même ID et la même couleur, donc on cumul les deux quantités(canapé choisi et canapé enregistré)
                    cartUser[indice].quantity += choiceUser.quantity;
                    this.saveCartUser(cartUser);
                    this.displayOkInAddTocart ();
                    checkUpdate = true;
                    break;//  la mise à jour a été faite => sortie de la boucle for
                }
            }// fin du scan du panier
            if (checkUpdate != true) {// si la mise à jour de la quantité (un choix d'un même canapé et avec la même couleur) n'a pas été faite alors on ajoute le choix du client au panier
                cartUser.push(choiceUser);
                this.saveCartUser(cartUser);
                this.displayOkInAddTocart ();
            }
        }
    }//fin de la méthode "addToCart"

    // La méthode "removeFromCart" supprime un produit avec l'id "idToRemove" et la couleur "colorToRemove" du panier
    removeFromCart(idToRemove,colorToRemove){
        const cart = new CartUser();
        let cartUser = cart.basket;
        let checkerror = true;
        for (let indice in cartUser) {
            if(cartUser[indice].id == idToRemove && cartUser[indice].color == colorToRemove){
                cartUser.splice(indice,1);
                this.saveCartUser(cartUser);
                location.reload();
                checkerror = false;
                break;
            }
        }
        if (checkerror) {
            alert('Désolé, mais le produit que vous désirez supprimer n\'est pas dans votre panier !!!');
        }
    }//fin de la méthode "removeFromCart"

    // La méthode "updateQuantity" modifie la quantité du produit avec l'id "idToUpdate" et la couleur "colorToUpdate" du panier par la quantité "newQty"
    updateQuantity(idToUpdate,colorToUpdate,newQty) {
        const cart = new CartUser();
        const cartUser = cart.basket;
        if (newQty === 0) {
            alert('Pour modifier la quantité à "0" cliquez sur le bouton "Supprimer"');
        }else{
            if (newQty == null || newQty == undefined) {
                alert('La quantité du produit que vous désirez modifier n\'est pas valide !!!');
            }else{
                for (let indice in cartUser) {
                    if(cartUser[indice].id == idToUpdate && cartUser[indice].color == colorToUpdate){
                        cartUser[indice].quantity = newQty;
                        this.saveCartUser(cartUser);
                        location.reload();
                        break;
                    }
                }   
            }
        }
    }//fin de la méthode "updateQuantity"

    // La méthode "saveCartUser" enregistre la réactualisation du panier dans "localStorage" du navigateur
    saveCartUser(cartUser){
        this.cartSort(cartUser);// tri du panier avant sauvegarde
        localStorage.setItem("cartUser",JSON.stringify(cartUser));
    }//fin de la méthode "saveCartUser"

    // La méthode cartSort tri le panier par "ID"
    cartSort(cartUser){
        console.log('ici ligne 102 avant le tri de cartUser cartUSer est : ',cartUser);
        for (let i in cartUser) {
            console.log('avant le tri tableau cartUser n° : ',i,' est ',cartUser[i]);
        }
        cartUser.sort(function(a,b){
            let x = a.id.toLowerCase();
            let y = b.id.toLowerCase();
            if (x < y) {return -1}
            if (x > y) {return 1}
            return 0;
        });
        console.log('ici ligne 113 après le tri de cartUser cartUSer est : ',cartUser);
        for (let i in cartUser) {
            console.log('apres le tri tableau cartUser n° : ',i,' est ',cartUser[i]);
        }
    }

    //La méthode "getNumberProduct" retourne le nombre de canapé selectionné(s) par le client dans le panier
    getNumberProduct(cartUser) {
        let nbCanape = 0 ;
        for (let product in cartUser){
            nbCanape += cartUser[product].quantity;
        }
        return nbCanape;
    }//fin de la méthode "getNumberProduct"

    // La méthode "displayOkInAddTocart" modifie le style du bouton "Ajouter au panier" de la page product.html quand le choix du client est validé
    displayOkInAddTocart() {//validation de mise à jour !! en modifiant la couleur du bouton "addToCart"
        // affichage du message "Produit enregistré dans votre panier !" dans le button "addToCart" pendant 2 s
        document.getElementById("addToCart").style.background = "green";
        document.getElementById("addToCart").innerHTML = "Produit enregistré dans votre panier !";
        setTimeout(() => {
            document.getElementById("addToCart").style.background = "#2c3e50";
            document.getElementById("addToCart").innerHTML = "Ajouter au panier";
        },"2000");
    }//fin de la méthode "displayOkInAddTocart"

    // La méthode "emptyCart" retourne "vrai" si le panier du client est vide sinon "faux" 
    emptyCart(cartUser){
        let cartLength = cartUser.basket.length;
        let emptyCart = false;
        if (cartLength === 0 ){
            emptyCart = true;
        }else{
            emptyCart = false;
        }
        return emptyCart;
    }//fin de la méthode "emptyCart"
}// fin de la classe "CartUser"