const sql = require('mssql/msnodesqlv8');
const dbConnect = require('./../connection/dbConnect');
const prefix = '/movies/';

/** Ensemble de routes définies pour le chemin http://localhost:3000/movies/* */
const moviesRoutes = (app) =>{
    // Permet de récupérer l'entièreté des films
    app.get(`${ prefix }`,
        (req,res) => {
            console.log('Get all Movies'); 
            let request = new sql.Request(dbConnect);
            request.query(
                `SELECT [Movie].[IdMovie] ,[Title] ,[Picture] ,[Trailer] ,[ReleaseDate] ,[Summary] 
                FROM [NetFlax].[dbo].[Movie]`,
                (err,result) => {
                    console.log('Query launched');
                    if(err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );
    // Permet de récupérer l'entièreté des titres de films
    app.get(`${ prefix }title/`,
        (req,res) => {
            let request = new sql.Request(dbConnect);
            request.query('SELECT [IdMovie] ,[Title] FROM [NetFlax].[dbo].[Movie]',
                (err,result) => {
                    if(err) console.log(err);
                    else res.send(result.recordset);
                }
            );
        }
    );
    // Permet de récupérer un film précis
    app.get(`${ prefix }:id`,
        (req,res) => {
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect);
            request.query(`SELECT [IdMovie] ,[Title] ,[Picture] ,[Trailer] ,[ReleaseDate] ,[Summary] FROM [NetFlax].[dbo].[Movie] WHERE [IdMovie] = ${id}`,
                (err,result) => {
                    if(err) console.log(err);
                    else if(result.recordset.length > 0) res.send(result.recordset[0]);
                    else res.send({error: "Pas d'élément avec cet identifiant"})
                }
            );
        }
    );
    app.post(`${prefix}`,
        (req, res) => {
            let body = req.body;
            let request = new sql.Request(dbConnect);
            request.query(`INSERT INTO Movie (IdMovie, Title, Duration, Picture, Trailer, ReleaseDate, Summary, ShortDescription) VALUES (${body.IdMovie}, '${body.Title}', ${body.Duration}, '${body.Picture}', '${body.Trailer}','${body.ReleaseDate}','${body.Summary}', '${body.ShortDescription}')`,
            (err, result)=>{
                if(err) console.log(err);
                else res.send(result.rowsAffected);
            });
        }
    );
    app.delete(`${prefix}:id`,
        (req, res) => {
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect);
            request.query(`DELETE FROM Movie WHERE IdMovie = ${id}`,
                (err,result)=>{
                    if(err) console.log(err);
                    else res.send(result.rowsAffected);
                }
            );
        }
    );
    app.put(`${prefix}:id`,
        (req,res) =>{
            let id = parseInt(req.params.id);
            let body = req.body;
            let request = new sql.Request(dbConnect);
            request.query(`UPDATE Movie SET Title = '${body.Title}', Duration = ${body.Duration}, Picture = '${body.Picture}', Summary = '${body.Summary}', ShortDescription = '${body.ShortDescription}', Trailer = '${body.Trailer}', ReleaseDate = '${body.ReleaseDate}' WHERE IdMovie = ${id}`,
            (err,result)=>{
                if(err) console.log(err);
                else res.send(result.rowsAffected);
            }
            );
        }
    );
}

module.exports = moviesRoutes;