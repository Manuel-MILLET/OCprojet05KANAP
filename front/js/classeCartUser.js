/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 27 août 2022 10h00
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
    }

    updateQuantity (idToUpdate,colorToUpdate,newQty) {
        const cart = new CartUser();
        let cartUser = cart.basket;
        let checkerror = true;
        if (newQty === 0) {
            alert('Désolé, mais si vous souhaitez mettre la quantité du produit à "0" cliquez sur le bouton "Supprimer"');
        }else{
            if (newQty == null || newQty == undefined) {
                alert('Désolé, mais la quantité du produit que vous désirez modifier n\'est pas valide !!!');
            }else{
                for (let indice in cartUser) {
                    if(cartUser[indice].id == idToUpdate && cartUser[indice].color == colorToUpdate){
                        cartUser[indice].quantity = newQty;
                        this.saveCartUser(cartUser);
                        location.reload();
                        checkerror = false;
                        break;
                    }
                }   
            }
        }
    }

    saveCartUser(cartUser){
        localStorage.setItem("cartUser",JSON.stringify(cartUser));
    }

    getNumberProduct(cartUser) {
        let nbCanape = 0 ;
        for (let product in cartUser){
            nbCanape += cartUser[product].quantity;
        }
        return nbCanape;
    }

    displayOkInAddTocart () {//validation de mise à jour !! en modifiant la couleur du bouton "addToCart"
        // affichage du message "Produit enregistré dans votre panier !" dans le button "addToCart" pendant 2,5 s
        document.getElementById("addToCart").style.background = "green";
        document.getElementById("addToCart").innerHTML = "Produit enregistré dans votre panier !";
        setTimeout(() => {
            document.getElementById("addToCart").style.background = "#2c3e50";
            document.getElementById("addToCart").innerHTML = "Ajouter au panier";
        },"2000");
    }

    emptyCart (cartUser){
        let cartLength = cartUser.basket.length;
        let emptyCart = false;
        if (cartLength === 0 ){
            emptyCart = true;
        }else{
            emptyCart = false;
        }
        return emptyCart;
    }
}// fin de la classe "CartUser"