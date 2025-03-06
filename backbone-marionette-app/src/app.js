// app.js
import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

Backbone.$ = window.jQuery = $;
Marionette.$ = window.jQuery = $;

// Template simple
const template = _.template('<h1>Hello, <%= name %>!</h1>');

// Définition de la vue (utilisation de ItemView pour Marionette 1.8.8)
const MyView = Marionette.ItemView.extend({
  template: template,
  serializeData: function () {  // `serializeData` is the correct method in Marionette 1.8.8
    return { name: 'Backbone & Marionette 1.8.8' };
  }
});

// Fonction pour vérifier si l'élément existe dans le DOM
function ensureElementExists(selector, callback) {
  if ($(selector).length) {
    callback();
  } else {
    setTimeout(() => ensureElementExists(selector, callback), 100);
  }
}

// Création de l'application Marionette
const MyApp = new Marionette.Application();

// Ajouter un Initializer
MyApp.addInitializer(function () {
  console.log("Marionette App Initializing...");

  // Assurez-vous que nous utilisons le même sélecteur que `single-spa-entry.js`
  ensureElementExists("#backbone-app-container", function () {
    console.log("Container found, initializing region...");
    
    // Définition correcte de la région principale
    MyApp.mainRegion = new Marionette.Region({ el: '#backbone-app-container' });

    // Afficher la vue seulement après que l'application ait démarré
    MyApp.mainRegion.show(new MyView());
  });
});

// Attendre que l'élément soit disponible avant de démarrer l'application
ensureElementExists("#backbone-app-container", function () {
  console.log("Starting Marionette App...");
  MyApp.start();
});

export default MyApp;
