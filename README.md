# MyPopList2

## Table of Contents
1. [Installation de Vite pour le nouveau Projet](#ViteProject-01)
2. [Installation et mise à jour des Packages](#ViteProject-02)
3. [Modification du fichier index.html](#ViteProject-03)
4. [Modification du fichier main.js](#ViteProject-04)
5. [Test des Modifications](#ViteProject-05)
6. [Creer le repo sur GitHub](#ViteProject-06)
7. [Installer gh-pages](#ViteProject-07)
8. [Modification des scripts du package.json](#ViteProject-08)
9. [Modification du fichier Homepage du package.json](#ViteProject-09)
10. [Creation de la configuration Vite](#ViteProject-10)
11. [Deploiement en local](#ViteProject-11)
12. [Deploiement sur GitHub](#ViteProject-12)
13. [Architecture du site](#ViteProject-13)

<a name="ViteProject-01"></a>
## 1) Installation de Vite pour le nouveau Projet 
Dans le *terminal*, se placer dans le repertoire ou l'on veut que le projet se trouve et executer la commande : 
```bash
npm create vite@latest
```
Il faut alors : 
- Saisie du Nouveau Projet : `ViteProject`
- Validation du Package Name : `viteproject`
- Validation du Framework : `vanilla`
- Choix du langage : `javascript`

<a name="ViteProject-02"></a>
## 2) Installation et mise à jour des Packages
Executer les commandes : 
```bash
cd ViteProject
npm install
npm run dev
```
Un test en local est alors possible sur l'url indiqué `http://localhost:XXXX`

<a name="ViteProject-03"></a>
## 3) Modification du fichier index.html
AVANT :
```html
    <div id="app"></div>
```
APRES :
```html
    <div id="app">
      <h1>Bonjour tout le monde !</h1>
      <p>Ceci est mon premier site web</p>
      <button id="clic-btn">Clique ici !</button>
    </div>
```

<a name="ViteProject-04"></a>
## 4) Modification du fichier main.js
Remplacer tout le code du `main.js` par :
```js
import './style.css'
let bouton = document.getElementById("clic-btn");
let app = document.getElementById("app");
bouton.addEventListener("click", () => { app.innerHTML += "<p>Bien joué !</p>" })
```

<a name="ViteProject-05"></a>
## 5) Test des Modifications
Executer la commande : 
```bash
npm run dev
```
Un test en local est alors possible sur l'url indiqué `http://localhost:XXXX`

<a name="ViteProject-06"></a>
## 6) Creer le repo sur GitHub
- Connexion à `GitHub`
- Dans `Repositories`, cliquer sur `New` et vérifier le repo soit public
- Mettre le nom du nouveau repo `ViteProject` et cliquer sur `Create Repository`
- Faire un *copier coller* dans le terminal du code affiché dans le `QuickSetup` et executer toutes les commandes :
```bash
echo "# ViteProject" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TcharlyMusic/ViteProject.git
git push -u origin main
```

<a name="ViteProject-07"></a>
## 7) Installer gh-pages
Executer la commande : 
```bash
npm install gh-pages --save-dev
```

<a name="ViteProject-08"></a>
## 8) Modification des scripts du package.json
Modifier le fichier `package.json` :
AVANT:
```js
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```
APRES:
```js
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
```

<a name="ViteProject-09"></a>
## 9) Modification du fichier Homepage du package.json
AVANT:
```js
{
  "name": "viteproject",
```
APRES (remplacer `<username>` par celui sur GitHub) :
```js
{
  "name": "viteproject",
  "homepage": "https://<username>.github.io/",
```

<a name="ViteProject-10"></a>
## 10) Creation de la configuration Vite
Ajouter le fichier 'vite.config.js' dans le repo et ajouter le contenu en modifier le `<NomDuRepo>` avec celui creer sur GitHub (ne pas oublier les '/') : 
```js
import { defineConfig } from 'vite'
export default defineConfig({
  base:'/<NomDuRepo>/'
})
```

<a name="ViteProject-11"></a>
## 11) Deploiement en local
```bash
npm run dev
```
Un test en local est alors possible sur l'url indiqué `http://localhost:XXXX`

<a name="ViteProject-12"></a>
## 12) Deploiement sur GitHub
```bash
npm run deploy
```
Le site est alors fonctionnel sur "https://TcharlyMusic.github.io/ViteProject"

<a name="ViteProject-13"></a>
## 13) Architecture du site
```
projet/
├── index.html
├── main.js
├── package.json
├── public/
│   └── Ici se trouvent toutes les images du site
└── style.css
```

<a name="ViteProject-14"></a>
## 14) Affichage MarkDown d'une Image
![Some Text](https://wallpapercave.com/wp/nV132Vj.jpg "In the Tooltip")

<a name="ViteProject-15"></a>
## 15) Affichage MarkDown d'information spécifique 
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

<a name="ViteProject-16"></a>
## 16) Affichage MarkDown de Tables

| **Left**     | **Centered**     | **Right**                  |
| :----------- | :--------------: | -------------------------: |
| This is left | Text is centered | And this is right-aligned  |
| More text    | Even more text   | And even more to the right |
| Adding Pipe  | Even \| text     | *some italic*              |