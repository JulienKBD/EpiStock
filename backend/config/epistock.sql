-- Créer la base de données
CREATE DATABASE IF NOT EXISTS epistock
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

USE epistock;

-- Table des utilisateurs
CREATE TABLE users (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'staff', 'admin') DEFAULT 'student',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table du matériel
CREATE TABLE materiel (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `numero_serie` VARCHAR(100) UNIQUE,
    `marque` VARCHAR(100),
    `valeur` DECIMAL(10,2),
    `etat` ENUM('Disponible', 'En prêt', 'En panne') DEFAULT 'Disponible',
    `emplacement` VARCHAR(150),
    `image_url` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table de la liste des souhaits
CREATE TABLE wishlist (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `marque` VARCHAR(100),
    `valeur` DECIMAL(10,2),
    `image_url` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des attributions (historique des prêts)
CREATE TABLE attributions (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `materiel_id` INT NOT NULL,
    `date_debut` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `date_fin` TIMESTAMP NULL,
    `statut` ENUM('En cours', 'Rendu') DEFAULT 'En cours',
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_materiel FOREIGN KEY (materiel_id) REFERENCES materiel(id) ON DELETE CASCADE
);

INSERT INTO materiel (name, type, marque, valeur, etat, emplacement, image_url, numero_serie)
VALUES
    ('Câble HDMI', 'Accessoire', 'Belkin', 15.00, 'En prêt', 'ALAN', '/assets/HDMI-Cable.png', 'HDMI123456'),
    ('Ordinateur Dell', 'Ordinateur', 'Dell', 800.00, 'En panne', 'STEVE', '/assets/Dell_Laptop.png', 'DELL123456'),
    ('Écran LG', 'Écran', 'LG', 200.00, 'Disponible', 'ISAAC', '/assets/LG_Monitor.png', 'LG123456'),
    ('Écran LG', 'Écran', 'LG', 200.00, 'En prêt', 'DENNIS', '/assets/LG_Monitor.png', 'LG789456');
