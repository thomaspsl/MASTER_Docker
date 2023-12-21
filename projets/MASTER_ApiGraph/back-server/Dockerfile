# Image de base Node.js
FROM node:alpine as build

# Installation des dépendances
COPY package.json /app/
WORKDIR /app
RUN npm install

# Ajout des fichiers du projet
COPY . /app

EXPOSE 8081

CMD ["npm", "run", "prod"]
