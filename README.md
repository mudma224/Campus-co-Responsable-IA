# 🌍 Campus Éco-Responsable & IA

**Application de signalement écologique du campus**  
Développée dans le cadre du module **Gestion de Projet Agile** - ENSA Beni Mellal

---

## 📋 Description du Projet

**Campus Éco-Responsable & IA** est une application web permettant aux étudiants et au personnel de l’ENSA Beni Mellal de signaler les problèmes environnementaux sur le campus (gaspillage d’énergie, fuites d’eau, salles éclairées inutilement, déchets, etc.) et de proposer des améliorations.

L’application intègre une **suggestion automatique d’actions éco-responsables** et distingue clairement deux rôles : **Étudiant** et **Administrateur**.

---

## ✨ Fonctionnalités Principales

### Pour les Étudiants (Utilisateur)
- Inscription et connexion
- Soumission de nouveaux signalements
- Consultation de **ses propres signalements** uniquement
- Suivi du statut en temps réel (`Nouveau` → `En cours` → `Traité`)

### Pour les Administrateurs
- Vue globale de **tous les signalements**
- Statistiques en temps réel (Total, Nouveau, En cours, Traité)
- Changement de statut avancé :
  - `Nouveau` → **Commencer** → `En cours`
  - `En cours` → **Marquer traité** → `Traité`
  - `Traité` → **Réouvrir**
- Recherche avancée (type, description, localisation)
- Filtre par statut

### Fonctionnalités Générales
- Suggestion IA automatique selon le type de problème
- Interface moderne et responsive
- Authentification sécurisée avec JWT
- Deux sessions indépendantes (User + Admin en même temps)

---

## 🛠️ Technologies Utilisées

### Backend
- **Spring Boot 3.3+** (Java 21)
- Spring Data JPA + Hibernate
- PostgreSQL
- Spring Security + JWT
- MapStruct (mapping)
- Lombok
- Validation (Jakarta)

### Frontend
- **React 18** + Vite
- Axios
- Bootstrap 5
- React Router (gestion des vues)

### Base de Données
- PostgreSQL avec schéma `ecologie`

---

## 🚀 Installation et Lancement

### Prérequis
- Java 21
- Node.js (v18+)
- PostgreSQL
- Maven

### 1. Base de Données
```sql
CREATE DATABASE campus_eco;
CREATE SCHEMA ecologie;
