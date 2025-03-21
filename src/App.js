import React, { Component } from 'react';
import './App.css';
import { FedaCheckoutButton } from 'fedapay-reactjs';

// Exemple de données produits

const products = [
  { id: 1, name: "Citizen", price: 100000, description: "Montre Citizen - Collection Super Titanium - Mechanical - Deux aiguilles, date, 40,5 mm.", image: "/assets/images/1.webp", currency: "XOF" },
  { id: 2, name: "Frédérique Constant", price: 250000, description: "Montre Frédérique Constant Classics Index, automatique.", image: "/assets/images/2.webp", currency: "XOF" },
  { id: 3, name: "Zeppelin", price: 300000, description: "Cette montre Zeppelin de la collection 100 ansse compose,d'un boitier rond.", image: "/assets/images/3.webp", currency: "XOF" },
  { id: 4, name: "Maserati", price: 150000, description: "Montre de la collection Competizione, 3 aiguilles date.", image: "/assets/images/4.webp", currency: "XOF" },
  { id: 5, name: "Tissot", price: 500000, description: "Montre de la collection PR100 mouvement quartz chronographe.", image: "/assets/images/5.webp", currency: "XOF" },
  { id: 6, name: "Seiko", price: 400000, description: "Montre Seiko Presage Cocktail Edition homme automatique.", image: "/assets/images/6.webp", currency: "XOF" },


];

// Composant pour afficher une card produit avec bouton de paiement

class ProductCard extends Component {

  render() {

    const { product, publicKey } = this.props;
    
    // Configuration dynamique pour le bouton de paiement selon le produit

    const checkoutButtonOptions = {

      public_key: publicKey,
      transaction: {
        amount: product.price,
        description: product.description,
        callback: "http://localhost:3000"
      },
      currency: {
        iso: product.currency
      },
      button: {
        class: 'btn btn-primary',
        text: `Payer ${product.price} ${product.currency}`
      },
      onComplete(resp) {
        const FedaPay = window['FedaPay'];

        if (resp.reason === FedaPay.DIALOG_DISMISSED) {

          window.location.href = "http://localhost:3000";
          alert('Paiement annulé');
        } else {
          alert('Transaction terminée : ' + resp.reason);
          window.location.href = "http://localhost:3000";

        }
        console.log(resp.transaction);
      }
    };

    return (

      <div className="col-md-4 mb-4">
        <div className="card">
        <img  src={`${product.image}`} className="card-img-top" alt={product.name}/>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>Prix : {product.price} {product.currency}</strong></p>
            <FedaCheckoutButton options={checkoutButtonOptions} />
          </div>
        </div>
      </div>

    );
  }
}

export default class App extends Component {

  PUBLIC_KEY = 'pk_sandbox_XXXXXXXXXXX';  // Ta clé publique FedaPay (à remplacer par sa clé publique FedaPay)

  render() {

    return (

      <div className="container">
        <h1 className="h1 mt-4 mb-3 text-center"><strong>Nos Produits</strong></h1>
        <div className="container mt-5">
          <div className="row">
          {products.map(product => (
            <ProductCard key={product.id} product={product} publicKey={this.PUBLIC_KEY} />
          ))}
          </div>  
        </div>
        {/* Le container d'intégration de FedaPay (souvent utilisé pour le rendu de la modal ou de l'iframe) */}
      </div>
      
    );
  }
}
