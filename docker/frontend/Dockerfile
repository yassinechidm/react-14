# Utilisation de l'image Node.js officielle
FROM node:20-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY frontend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY frontend/ .

# Exposer le port pour le serveur de développement
EXPOSE 3000

# Commande par défaut
CMD ["npm", "start"]
