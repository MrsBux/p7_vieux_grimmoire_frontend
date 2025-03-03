const express = require("express");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const path = require("path");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

// Connexion à la base de données MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir les images statiques depuis le répertoire 'images'
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes de base pour les livres et l'authentification des utilisateurs
app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
