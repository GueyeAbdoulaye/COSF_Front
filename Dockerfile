# --- Build Angular ---
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production --output-path=dist/app

# --- Nginx ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist/app/ /usr/share/nginx/html/

# place le fichier principal au bon endroit
COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
