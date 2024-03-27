const path = require('path');

module.exports = {
  // Autres configurations...
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Chemin vers les fichiers statiques
    compress: true,
    port: 8080, // Port du serveur de développement
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL du serveur backend
        pathRewrite: {'^/api' : ''}, // Permet de retirer le préfixe /api de la requête
        changeOrigin: true,
      }
    }
  }
};
