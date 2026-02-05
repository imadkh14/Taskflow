# Taskflow

Une application moderne de gestion de tâches full-stack avec Spring Boot et React.

## 📋 Description

Taskflow est une application web complète permettant de gérer des listes de tâches et des tâches individuelles. Elle offre une interface utilisateur intuitive et une API REST robuste pour créer, organiser et suivre vos tâches quotidiennes.

## ✨ Fonctionnalités

- ✅ Créer, modifier et supprimer des listes de tâches
- ✅ Gérer des tâches avec priorités (LOW, MEDIUM, HIGH)
- ✅ Suivre le statut des tâches (PENDING, IN_PROGRESS, COMPLETED)
- ✅ Interface utilisateur réactive et moderne
- ✅ API REST complète
- ✅ Gestion globale des erreurs
- ✅ Support CORS configuré

## 🛠️ Stack Technique

### Backend

- **Java 21**
- **Spring Boot 3.5.3**
- **Spring Data JPA**
- **MySQL** - Base de données
- **Maven** - Gestion des dépendances

### Frontend

- **React 19.2.4**
- **Vite 7.3.1** - Build tool
- **TailwindCSS 4.1.18** - Styling
- **React Router 7.13.0** - Navigation
- **TanStack React Query 5.90.20** - Gestion d'état serveur
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **React Hot Toast** - Notifications

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Java JDK 21** ou supérieur
- **Maven 3.6+**
- **Node.js 18+** et npm
- **MySQL 8.0+**
- Un IDE (IntelliJ IDEA, VS Code, etc.)

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <repository-url>
cd tasksapp
```

### 2. Configuration de la base de données

Créez une base de données MySQL :

```sql
CREATE DATABASE tasksapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configuration du Backend

Modifiez le fichier `backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tasksapp_db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=votre_mot_de_passe
```

Installez les dépendances et compilez :

```bash
cd backend
mvn clean install
```

### 4. Configuration du Frontend

Installez les dépendances npm :

```bash
cd frontend
npm install
```

## 🏃 Démarrage de l'application

### Démarrer le Backend

```bash
cd backend
mvn spring-boot:run
```

Le serveur backend sera disponible sur `http://localhost:8080`

### Démarrer le Frontend

```bash
cd frontend
npm run dev
```

L'interface utilisateur sera disponible sur `http://localhost:5173`

## 📚 API Endpoints

### Task Lists

| Méthode | Endpoint                       | Description                    |
| ------- | ------------------------------ | ------------------------------ |
| GET     | `/api/taskLists`               | Récupérer toutes les listes    |
| POST    | `/api/taskLists`               | Créer une nouvelle liste       |
| GET     | `/api/taskLists/{tasklist_id}` | Récupérer une liste spécifique |
| PUT     | `/api/taskLists/{tasklist_id}` | Mettre à jour une liste        |
| DELETE  | `/api/taskLists/{tasklist_id}` | Supprimer une liste            |

### Tasks

| Méthode | Endpoint                             | Description                             |
| ------- | ------------------------------------ | --------------------------------------- |
| GET     | `/api/{tasklist_id}/tasks`           | Récupérer toutes les tâches d'une liste |
| POST    | `/api/{tasklist_id}/tasks`           | Créer une nouvelle tâche                |
| GET     | `/api/{tasklist_id}/tasks/{task_id}` | Récupérer une tâche spécifique          |
| PUT     | `/api/{tasklist_id}/tasks/{task_id}` | Mettre à jour une tâche                 |
| DELETE  | `/api/{tasklist_id}/tasks/{task_id}` | Supprimer une tâche                     |

### Exemple de requête - Créer une TaskList

```json
POST /api/taskLists
Content-Type: application/json

{
  "name": "Mes tâches du jour",
  "description": "Liste des tâches à accomplir aujourd'hui"
}
```

### Exemple de requête - Créer une Task

```json
POST /api/{tasklist_id}/tasks
Content-Type: application/json

{
  "title": "Finir le rapport",
  "description": "Compléter le rapport mensuel",
  "priority": "HIGH",
  "status": "PENDING",
  "dueDate": "2026-02-10T10:00:00"
}
```

## 📁 Structure du Projet

```
tasksapp/
├── backend/
│   ├── src/main/java/com/imaddev/tasksapp/
│   │   ├── config/          # Configuration (CORS, etc.)
│   │   ├── controllers/     # Contrôleurs REST
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # Entités JPA
│   │   ├── mappers/        # Mappers DTO <-> Entity
│   │   ├── repositories/   # Repositories JPA
│   │   └── services/       # Logique métier
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/
    ├── src/
    │   ├── api/            # Services API
    │   ├── components/     # Composants réutilisables
    │   ├── hooks/          # Custom hooks React
    │   ├── pages/          # Pages de l'application
    │   ├── App.jsx         # Composant principal
    │   └── main.jsx        # Point d'entrée
    └── package.json
```

## 🎨 Modèles de Données

### TaskList

- `id` (UUID)
- `name` (String)
- `description` (String)
- `createdAt` (LocalDateTime)
- `updatedAt` (LocalDateTime)

### Task

- `id` (UUID)
- `title` (String)
- `description` (String)
- `priority` (LOW | MEDIUM | HIGH)
- `status` (PENDING | IN_PROGRESS | COMPLETED)
- `dueDate` (LocalDateTime)
- `taskList` (TaskList)
- `createdAt` (LocalDateTime)
- `updatedAt` (LocalDateTime)

## 🔧 Scripts disponibles

### Backend

```bash
mvn clean install    # Installer les dépendances
mvn spring-boot:run  # Démarrer l'application
mvn test            # Lancer les tests
```

### Frontend

```bash
npm install         # Installer les dépendances
npm run dev        # Mode développement
npm run build      # Build de production
npm run preview    # Prévisualiser le build
```

## 🐛 Dépannage

### Problème de connexion à la base de données

- Vérifiez que MySQL est démarré
- Vérifiez les credentials dans `application.properties`
- Assurez-vous que la base de données `tasksapp_db` existe

### Erreur CORS

- Le backend est configuré pour accepter les requêtes depuis `http://localhost:5173`
- Modifiez `CorsConfig.java` si vous utilisez un autre port

### Port déjà utilisé

- Backend : Changez le port dans `application.properties` avec `server.port=8081`
- Frontend : Modifiez `vite.config.js` pour changer le port

## 👨‍💻 Auteur

Développé par **kh.imad**

---

⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile !
