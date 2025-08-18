# --- Build Angular ---
FROM node:20 AS build
WORKDIR /app

# deps (utilise le lock pour npm ci)
COPY package*.json ./
RUN npm ci

# sources + build -> on FORCE le dossier de sortie
COPY . .
RUN npm run build -- --configuration=production --output-path=dist/app

# --- Nginx ---
FROM nginx:1.27-alpine
# copie LE dossier qu'on vient de forcer
COPY --from=build /app/dist/app/ /usr/share/nginx/html/

# tes fichiers habituels
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
