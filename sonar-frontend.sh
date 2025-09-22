#!/bin/bash

# Script pour lancer l'analyse SonarQube du frontend COSF uniquement

echo "============================================="
echo "  Analyse SonarQube - Frontend COSF Angular "
echo "============================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si SonarScanner est installé
if ! command -v sonar-scanner &> /dev/null && [ ! -f "/opt/sonar-scanner/bin/sonar-scanner" ]; then
    print_error "SonarScanner n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si SonarQube est accessible
print_info "Vérification de la disponibilité de SonarQube..."
if ! curl -s http://localhost:9000/api/system/status | grep -q "UP"; then
    print_error "SonarQube n'est pas accessible sur http://localhost:9000"
    print_info "Veuillez démarrer SonarQube avant de lancer ce script"
    exit 1
fi
print_success "SonarQube est accessible"

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    print_info "Installation des dépendances npm..."
    npm install
    
    if [ $? -ne 0 ]; then
        print_error "Erreur lors de l'installation des dépendances npm"
        exit 1
    fi
    print_success "Dépendances npm installées"
else
    print_info "Dépendances npm déjà installées"
fi

# Optionnel: Build du projet (recommandé pour une meilleure analyse)
print_info "Build du projet Angular..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Erreur lors du build Angular"
    print_info "Analyse SonarQube lancée malgré l'erreur de build..."
fi

# Lancement de l'analyse SonarQube
print_info "Lancement de l'analyse SonarQube..."

# Utiliser le scanner installé
if command -v sonar-scanner &> /dev/null; then
    sonar-scanner
else
    /opt/sonar-scanner/bin/sonar-scanner
fi

if [ $? -eq 0 ]; then
    print_success "Analyse SonarQube terminée avec succès !"
    print_success "Consultez les résultats sur http://localhost:9000"
    print_info "Projet: cosf-frontend"
else
    print_error "Erreur lors de l'analyse SonarQube"
    exit 1
fi

echo "============================================="
