# Image de base Node.js
FROM node:latest

# Installation des dépendances
COPY package.json  /app/
WORKDIR /app
RUN npm install

# Ajout des fichiers du projet
COPY . /app

# Build de l'application Vue.js
RUN npm run build

# Installation de Nginx sur la même image
RUN apt-get update
RUN  apt-get install -y nginx python3

# Copie des fichiers de build vers le dossier de Nginx
RUN cp -r /app/dist/* /var/www/html

EXPOSE 80
# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]