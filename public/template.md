---
layout: "../../layouts/PageLayout.astro"
title: "mockupppp"
date: "date"
auteur: "random étudiant qui écrit"
author: "le vrai auteur"
type: "lecture"

---

<section>

section tag wraps the entire article and lets the endnote in their own section. 

## Ceci est un titre 2 (ne pas faire de titre 1, c'est réservé au titre de l'article)

### Là c'est un titre 3 mgl


Il est possible de rajouter des notes de bas de page avec les lignes de codes suivantes.<label for='' class='margin-toggle sidenote-number'></label>
<input type='checkbox' id='' class='margin-toggle'/>
<span class='sidenote'>
Ici il faut mettre le texte de la note de bas de page
</span>Les notes apparaissent automatiquement en bas de page. On peut utiliser <strong>strong</strong> pour indiquer du gras.

Le tag hr permet de faire une ligne horizontale. Il est possible de l'utiliser pour séparer les chapitres ou sous-chapitres d'un article.

<hr>

### Là c'est un titre 3 mgl

Le texte est séparé en paragraphes sans le tag p juste avec des lignes vides autour. 

<div class="epigraph">
    <blockquote>
        <p>“On peut rajouter des citations avec la div epigraph dans un blockquote p.”</p>
        <footer>— et remplir le footer avec l'auteur <cite> et le titre du livre dans le tag cite</cite></footer>
    </blockquote>
</div>

Pour les articles de pays, le bloc bandeaupol permet de presenter un parti avec son logo en img dans le directory "public" et le nom du parti dans le data-sample. Il est possible de rajouter plusieurs noms departis en les séparant par des virgules.

<div class="bandeauPol" data-sample='["PCF", "GDR", "CRCE-K"]'>
<img src="/France/PCF.png">
</div>

On peut facilement ajouter un réprésentation parlemantaire avec le code suivant. Il faut juste changer le nom du pays dans le tag span et le code svg est généré automatiquement.

<figure id="FR-U" >
    <span class="marginnote"> <strong style="font-family: 'Wahroonga'; font-size: 1.8rem;">Sénat</strong><hr></span>
</figure>

<figure id="FR-L" >
    <span class="marginnote"> <strong style="font-family: 'Wahroonga'; font-size: 1.8rem;">Sénat</strong><hr></span>
</figure>

<figure class="fullwidth">
<img src="https://www.lalettre.fr/fr/utils/imageresize?x=1400&web=1&file64=TExBXFBob3Rvc1xlbW1hbnVlbG1hY3Jvbi5qcGc=">
</figure>

</section>