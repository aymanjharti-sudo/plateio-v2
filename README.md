# Plateio v2 — Déploiement Vercel

## Étapes de déploiement

### 1. GitHub
1. Va sur github.com et connecte-toi
2. Clique sur le "+" en haut à droite → "New repository"
3. Nom : `plateio` — laisse tout le reste par défaut — clique "Create repository"
4. Clique "uploading an existing file"
5. Extrait le ZIP téléchargé et glisse-dépose TOUS les fichiers/dossiers
6. Clique "Commit changes"

### 2. Vercel
1. Va sur vercel.com → "Sign up" avec GitHub
2. Clique "Add New Project"
3. Sélectionne ton repo `plateio`
4. Framework : Create React App (détecté automatiquement)
5. Clique "Deploy"

### 3. Clé API (IMPORTANT)
1. Dans le projet Vercel → onglet "Settings"
2. Clique "Environment Variables"
3. Ajoute :
   - Key : `ANTHROPIC_API_KEY`
   - Value : ta clé (commence par sk-ant-...)
4. Clique "Save"
5. Va dans "Deployments" → clique les "..." → "Redeploy"

### Obtenir une clé API
→ console.anthropic.com → "API Keys" → "Create Key"

## Coût estimé
- Vercel : GRATUIT
- Anthropic API : ~3$/mois (≈ 1000 recettes)
