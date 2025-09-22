# README – Frontend (Angular 20)

## 🧭 Aperçu

Application web **COSF** (site de basket) basée sur **Angular 20**, **Angular Material**, **Tailwind CSS** et **Google Maps**. Authentification via JWT (consommation de l’API Spring Boot). Déployée derrière un reverse proxy (Caddy/Nginx) sur VPS. Supervision HTTP via **Blackbox Exporter** + **Grafana**.

## 🛠️ Stack

* Angular **20.x** (CLI, core, router, forms, material)
* Tailwind CSS **3.x**
* Google Maps (`@angular/google-maps`)
* Tests : Karma/Jasmine

## ✅ Prérequis

* **Node.js** LTS (>= 20)
* **npm** (>= 10)
* Accès à l’API backend (URL + CORS OK)

## ⚙️ Configuration (environnements)

Créer/compléter :

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Exemple :

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://api.cosf.fr',
  googleMapsKey: 'YOUR_GOOGLE_MAPS_API_KEY',
};
```

> ⚠️ Ne **committe** pas les clés en clair (utiliser variables d’environnement + CI/CD secrets si possible).

## ▶️ Démarrer en local

```bash
npm ci         # ou npm install
npm start      # ng serve
```

Application : [http://localhost:4200](http://localhost:4200)

## 🧪 Tests

```bash
npm test
```

Rapport de couverture : `coverage/`

## 🏗️ Build prod

```bash
npm run build  # génère dist/cosf-front
```

## 🐳 Docker (exemple rapide)

Dockerfile (multi-étapes) – à adapter si tu utilises un serveur statique (Nginx/Caddy) :

```dockerfile
# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist/cosf-front/ /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## 🔒 Accessibilité (extraits mis en place)

* **Skip link** + focus sur `<main>` à chaque navigation ; titres/landmarks sémantiques.
* Contrastes conformes, navigation clavier complète, messages d’erreurs lisibles.
* Composants dynamiques (dialog/snackbar) annoncés si besoin (`aria-live`).

## 📡 Monitoring & SLO

* Supervision via **Blackbox Exporter** (HTTP 2xx) → panels Grafana.
* Cible : **disponibilité ≥ 99,5 %** ; **p95 latence < 800 ms** côté front.

## 🔁 CI/CD (exemple GitHub Actions)

```yaml
name: ci-front
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci && npm run build && npm test -- --watch=false
      # Build/push image si nécessaire
```

## 📁 Structure (extrait)

```
src/
  app/
  assets/
  environments/
```
