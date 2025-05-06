# DevInk - Code Editor

**DevInk** est un éditeur de code moderne et léger, conçu avec React, TypeScript et Electron. Il permet d’éditer du code localement avec mise en évidence syntaxique, historique intelligent, navigation multi-fichiers, et une interface responsive. Ce projet a pour but d’explorer la création d’applications desktop avec des technologies web modernes.

[Voir le code sur GitHub](https://github.com/LilianMrzt/dev-ink)

---

## Détails techniques

Ce projet a été développé avec les technologies et concepts suivants :

- **React 18** — pour la construction de l’interface
- **TypeScript** — pour un typage statique robuste
- **Electron** — pour la création et l'intégration d'une application de bureau avec React
- **PrismJs** — pour un surlignage synthaxique du code
- **React-window** — pour un rendu plus performant
- **ESLint** — pour assurer la qualité du code

---



## Statut

> Ce projet est **en cours de développement** et ne représente pas la qualité finale d’un éditeur de code. Il a été développé à des fins d’apprentissage autour d’Electron et de React pour le desktop.
>
> Des fonctionnalités à venir incluent :
> - Terminal intégré
> - Refactorisation de code
> - Intégration avec Git
> - Auto-complétion
> - Support de plus de langages
> - Recherche globale

---

## Fonctionnalités

- Édition de code avec surlignage syntaxique (support de plusieurs langages)
- Système d'historique intelligent (annuler / refaire)
- Navigation multi-fichiers avec onglets
- Numérotation des lignes synchronisée
- Lecture / écriture de fichiers locaux via Electron

---

## Installation

### Pré-requis

- Node.js ≥ 18.x
- Yarn ≥ 1.22

### Étapes

1. **Cloner le dépôt :**
```bash
git clone https://github.com/LilianMrzt/dev-ink.git
cd dev-ink
```

2. **Installer les dépendances :**

Si vous n’avez pas Yarn, installez-le avec :
```bash
npm install --global yarn
```

Pour installer les dépendances:

```bash
yarn install
```

3. **Lancer le projet localement :**

Lors du premier lanccement ou de après la modification de modules relatifs à Electron, il faut rebuild electron:
```bash
yarn build:electron
```

Puis, pour lancer le projet le projet sur une application en local:
```bash
yarn desktop:dev
```
