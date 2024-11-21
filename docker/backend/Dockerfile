# Utilisation de l'image officielle PHP avec extensions nécessaires pour Symfony
FROM php:8.2-cli

# Suggestion: Utiliser php:8.2-fpm pour la production

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install \
    intl \
    pdo_mysql \
    zip

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /app

# Copier composer.json et composer.lock
COPY backend/composer.* ./

# Installer les dépendances
RUN composer update --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

# Copier le reste du projet
COPY backend/ .

# Créer le dossier public s'il n'existe pas
RUN mkdir -p public

# Exposer le port
EXPOSE 8000

# Commande par défaut
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
