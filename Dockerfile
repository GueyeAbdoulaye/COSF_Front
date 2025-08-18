# Étape 1 : build Angular avec le CLI local
FROM node:20 AS build
WORKDIR /app

# installe les deps
COPY package.json package-lock.json ./
RUN npm ci

# copie le code et build
COPY . .
# utilise le script "build" de package.json (qui appelle ng depuis node_modules/.bin)
RUN npm run build -- --configuration=production
#            ^^^^ important

# Étape 2 : Nginx
FROM nginx:1.27-alpine
# ⚠️ adapte le chemin dist selon ton angular.json
# Angular 16/17: souvent dist/<nom-projet>/browser
COPY --from=build /app/dist/cosf_front/browser /usr/share/nginx/html
# ou si ton outputPath est dist/cosf_front : /app/dist/cosf_front

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
