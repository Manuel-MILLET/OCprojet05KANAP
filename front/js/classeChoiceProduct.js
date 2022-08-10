/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 10 août 2022 10h00
ce fichier contient les classes "Canape", CartUser et Order.
*/
//************************************************************************************************************//
// La classe "ChoiceProduct" contient les propriétés et les méthodes des produits selectionnés par le client
//*************************************************************************************************************//

class ChoiceProduct {
  // Définition des propriétés de l'objet "ChoiceProduct"
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    this.init();
  }
  // Définition de la méthode de l'objet "choiceProduct"
  init() {
    this.id = 0;
    this.color = "";
    this.quantity = 0;
  }
}// Fin de la classe "ChoiceProduct", qui comprend le choix du client pour un canapé donné et pour une couleur donnée 