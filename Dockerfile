# Utilisation de Node.js 20.9.0 comme image de base
FROM node:20.9.0-alpine

# Définition des variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Création et définition du répertoire de travail
WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (production uniquement)
RUN npm ci --only=production --no-optional --silent

# Copie du code source
COPY . .

# Création d'un utilisateur non-root et attribution des permissions, 
# puis création du répertoire de logs avec les droits appropriés
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/src/app && \
    mkdir -p logs && chown -R nodejs:nodejs logs

# Exposition du port
EXPOSE ${PORT}

# Passage à l'utilisateur non-root
USER nodejs

# Commande de démarrage
CMD ["node", "src/server.js"]
