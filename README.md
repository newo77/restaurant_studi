### Projet ecf restaurant Studi

This projet was created for the exam january 2024

## Dependencies

Run npm install for download all dependencies

## Environments

install node js version 18 install npm version 9.8.1

## Access to database

create a user with all permission, the default password is root

## Feed database

In the project, you have a folder who contain the file 'restaurantStudi.Sql',
use it for feed you're database and get all the row necessary

# npm start

Runs the app in the development mode. Open http://localhost:3000 to view it in
your browser.

The page will reload when you make changes. You may also see any lint errors in
the console.

⚠️ don't forget to launch the local server : node src/server.js

# npm run build

Run this command for create a compile version of your app to deploy

### Comment utiliser l'app

créer un compte en cliquant sur 'connexion', si c'est la 1ère fois que vous vous
connectez, alors cliquez sur "s'inscrire", vous devrez rentré différent champ et
par la suite choisir un rôle, le rôle pouvant se choisir uniquement tant que
l'administrateur n'est pas définit, après s'être inscrit il ne vous reste plus
qu'à vous connectez.

Une fois connectez, l'app vous redirige vers la page d'accueil , ici vous y
trouverez les images que l'administrateur aura saisit.

# role Admin

Vous pouvez en tant qu'admin :

- accédez à l'ajout/modification/suppression des images sur la page d'accueil
- Modifier les horaires d'ouvertures et de fermetures du restaurant
- Accédez au dashboard de l'admin pour set la valeur du max de convives en base
  de donnée en allant sur "réservations"

# role User ( compte client )

En tant qu'user, quand vous vous inscrivez , vous avez des champs a remplir qui
sont convives par défaut et allergies qui seront Set automatiquement dans
l'onglet réservations quand vous voudrez réservé, evidemment les fonctionnalités
restent minimes en termes de temp accordés mais j'aurais bien ajoutés un système
de fidélité, un sytème de paiement..

# role Visiteur

Sans inscription, on peux quand même navigué sur le site, nous pouvons voir les
Images saisit par l'admin , réserver une table , voir le menu proposé sur
l'onglet "menu", faire des réservations, contactez l'équipe du restaurant(il est
en preventdefault actuellement car je veux faire un truc sophistiqué), et la
connexion pour s'inscrire ou se désinscrire
