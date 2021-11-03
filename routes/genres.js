const sql = require('mssql/msnodesqlv8');
const dbConnect = require('./../connection/dbConnect');
const prefix = '/genres/';

const genresRoutes = (app) => {
    app.get(`${prefix}`, 
        (req, res) => {
            let request = new sql.Request(dbConnect);
            request.query(`SELECT IdGenre, Label FROM Genre`,
            (err, result)=>{
                if(err) console.log(err);
                else res.send(result.recordset);
            });
        }
    );
    app.get(`${prefix}:id`,
        (req, res) =>{
            let id = parseInt(req.params.id);
            let request = new sql.Request(dbConnect);
            request.query(`SELECT IdGenre, Label FROM Genre WHERE IdGenre = ${id}`,
            (err,result)=> {
                if (err) console.log(err);
                else if(result.recordset.length > 0) res.send(result.recordset[0]);
                else console.log("Aucune information ne correspond à l'identifiant donné.")
            });
        }
    );
    app.post(`${prefix}`,
        (req, res) =>{
            let body = req.body;
            let request = new sql.Request(dbConnect);
            request.query(`INSERT INTO Genre (IdGenre, Label) OUTPUT inserted.IdGenre VALUES (${body.IdGenre}, '${body.Label}')`,
                (err, result) =>{
                    if(err) console.log(err);
                    else res.send(result);
                }
            );
        }
    );
}

module.exports = genresRoutes;