const genresRoutes = require('./genres');
const moviesRoutes = require('./movies');

const appRoutes = (app) => {
    app.get('/',
        (req, res) => {
            let accueil = {
                description: "Bienvenu sur l'API de Netflax, vous pourrez accèder aux informations des films avec l'url : http://localhost:3000/Movies",
                routes:
                {
                    movies: "http://localhost:3000/Movies",
                    "movie-by-id" : "http://localhost:3000/Movie/:id",
                    "movie-by-genre" : "http://localhost:3000/Movies/:genre-name",
                }
            };
            res.send(accueil);
        }
    );

    moviesRoutes(app);
    genresRoutes(app);
};

module.exports = appRoutes;