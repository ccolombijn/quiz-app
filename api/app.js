
"use strict";

const api = (function(){

  const mysql = require( 'mysql' )
  const express = require( 'express' )
  const app = express()
  const bodyParser = require( 'body-parser' )

  app.use( bodyParser.json() )
  app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  // config
  const config = {
    db : {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'quiz'
    }//,routes : [ 'game','game/:id','questions','questions/:id','anwsers','anwsers/:id' ]
  }
  const connection = mysql.createConnection( config.db )
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected!');
    }
  });
// .............................................................................
// questions
/* -----------------------------------------------------------------------------
    * questions get
  */
  app.get( `/api/questions/:id`, function( req, res ) {

    let id = +req.params[ 'id' ]

    connection.query(`SELECT * FROM questions where id=?`, id, ( err, rows ) => {
      if (!err) {
        let record = rows[0];
        res.setHeader('Content-Type', 'application/json')
        record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
      } else {
        throw err
      }
    })
  });

  app.get(`/api/questions`, function(req, res) {

    res.setHeader('Content-Type', 'application/json')

    connection.query(`SELECT * FROM questions`, ( err, records ) => {
      if (!err) {
        res.end( JSON.stringify(records) )
      } else {
        throw err
      }
    })
  });

/* -----------------------------------------------------------------------------
  * questions post
  */

  app.post('/api/questions', function(req, res) {

  let question = req.body;
  connection.query('INSERT INTO questions SET ?', question, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json')
      connection.query('SELECT * FROM questions where id=?', result.insertId, (err, rows) => {
        if (!err) {
          let question = rows[0];
          if (question) {
            res.setHeader('Content-Type', 'application/json')
            res.status(201).end(JSON.stringify(question));
          } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(404).end();
          }
        } else {
          throw err;
        }
      });
    } else {
      throw err;
    }
  });
});

/* -----------------------------------------------------------------------------
  * questions put
  */

  app.put( `/api/questions/:id`, function( req, res ) {

    let id = +req.params[ 'id' ]
    // bad request
    if( pointer.indexOf( '=' ) ){
      res.setHeader('Content-Type', 'application/json')
      res.status(400).end()
      return
    }

    let body = req.body
    let query = `UPDATE ${table} SET `
    let query_fields = []
    for( let field in fields ){
      query += `${fields[field]} = ?`
      if( field < fields.length ) query += ','
      query_fields.push( body[ fields[ field ] ])
    }
    query += `WHERE ${key} = ?`
    query_fields.push( pointer )
    connection.query( query, query_fields, ( err, result ) => {
      if (!err) {
        connection.query(`SELECT * FROM ${table} where ${key}=?`, [ pointer ], ( err, rows ) => {
          if (!err) {
            let table = rows[0]
            if (table) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(table))
            } else {
              res.setHeader('Content-Type', 'application/json')
              res.status(404).end()
            }
          } else {
            throw err
          }
        })
      }else {
        throw err
      }
    })
  });



/* -----------------------------------------------------------------------------
  * questions delete
  */

  app.delete(`/api/questions/:id`, function( req, res ) {
    let id =+req.params['id']

    connection.query( `DELETE FROM questions WHERE id = ?`, [id], ( err, result ) => {
      if (!err) {
        res.status(204).end();
      } else {
          throw err;
      }
    })
  })

// .............................................................................
// anwsers
/* -----------------------------------------------------------------------------
  * anwsers get
  */
    app.get( `/api/anwsers/:id`, function( req, res ) {

      let id = +req.params[ 'id' ]

      connection.query(`SELECT * FROM anwsers where id=?`, id, ( err, rows ) => {
        if (!err) {
          let record = rows[0];
          res.setHeader('Content-Type', 'application/json')
          record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
        } else {
          throw err
        }
      })
    });

    app.get(`/api/anwsers`, function(req, res) {

      res.setHeader('Content-Type', 'application/json')

      connection.query(`SELECT * FROM anwsers`, ( err, records ) => {
        if (!err) {
          res.end( JSON.stringify(records) )
        } else {
          throw err
        }
      })
    });

/* -----------------------------------------------------------------------------
  * anwsers post
  */

    app.post('/api/anwsers', function(req, res) {

    let anwser = req.body;
    connection.query('INSERT INTO anwsers SET ?', anwser, (err, result) => {
      if (!err) {
        res.setHeader('Content-Type', 'application/json')
        connection.query('SELECT * FROM anwsers where id=?', result.insertId, (err, rows) => {
          if (!err) {
            let anwser = rows[0];
            if (anwser) {
              res.setHeader('Content-Type', 'application/json')
              res.status(201).end(JSON.stringify(anwser));
            } else {
              res.setHeader('Content-Type', 'application/json')
              res.status(404).end();
            }
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
  });

  /* -----------------------------------------------------------------------------
    * anwsers put
  */

    app.put( `/api/anwsers/:id`, function( req, res ) {

      let id = +req.params[ 'id' ]
      // bad request
      if( pointer.indexOf( '=' ) ){
        res.setHeader('Content-Type', 'application/json')
        res.status(400).end()
        return
      }

      let body = req.body
      let query = `UPDATE ${table} SET `
      let query_fields = []
      for( let field in fields ){
        query += `${fields[field]} = ?`
        if( field < fields.length ) query += ','
        query_fields.push( body[ fields[ field ] ])
      }
      query += `WHERE ${key} = ?`
      query_fields.push( pointer )
      connection.query( query, query_fields, ( err, result ) => {
        if (!err) {
          connection.query(`SELECT * FROM ${table} where ${key}=?`, [ pointer ], ( err, rows ) => {
            if (!err) {
              let table = rows[0]
              if (table) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(table))
              } else {
                res.setHeader('Content-Type', 'application/json')
                res.status(404).end()
              }
            } else {
              throw err
            }
          })
        }else {
          throw err
        }
      })
    });



  /* -----------------------------------------------------------------------------
    * anwsers delete
  */

    app.delete(`/api/anwsers/:id`, function( req, res ) {
      let id =+req.params['id']

      connection.query( `DELETE FROM anwsers WHERE id = ?`, [id], ( err, result ) => {
        if (!err) {
          res.status(204).end();
        } else {
            throw err;
        }
      })
    })




    // .............................................................................
    // game
    /* -----------------------------------------------------------------------------
      * game get
      */
        app.get( `/api/game/:id`, function( req, res ) {

          let id = +req.params[ 'id' ]

          connection.query(`SELECT * FROM game where id=?`, id, ( err, rows ) => {
            if (!err) {
              let record = rows[0];
              res.setHeader('Content-Type', 'application/json')
              record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
            } else {
              throw err
            }
          })
        });

        app.get(`/api/game`, function(req, res) {

          res.setHeader('Content-Type', 'application/json')

          connection.query(`SELECT * FROM game`, ( err, records ) => {
            if (!err) {
              res.end( JSON.stringify(records) )
            } else {
              throw err
            }
          })
        });

    /* -----------------------------------------------------------------------------
      * game post
      */

        app.post('/api/game', function(req, res) {

        let anwser = req.body;
        connection.query('INSERT INTO game SET ?', anwser, (err, result) => {
          if (!err) {
            res.setHeader('Content-Type', 'application/json')
            connection.query('SELECT * FROM game where id=?', result.insertId, (err, rows) => {
              if (!err) {
                let item = rows[0];
                if (item) {
                  res.setHeader('Content-Type', 'application/json')
                  res.status(201).end(JSON.stringify(item));
                } else {
                  res.setHeader('Content-Type', 'application/json')
                  res.status(404).end();
                }
              } else {
                throw err;
              }
            });
          } else {
            throw err;
          }
        });
      });

      /* -----------------------------------------------------------------------------
        * game put
      */

        app.put( `/api/game/:id`, function( req, res ) {

          let id = +req.params[ 'id' ]
          // bad request
          if( pointer.indexOf( '=' ) ){
            res.setHeader('Content-Type', 'application/json')
            res.status(400).end()
            return
          }

          let body = req.body
          let query = `UPDATE ${table} SET `
          let query_fields = []
          for( let field in fields ){
            query += `${fields[field]} = ?`
            if( field < fields.length ) query += ','
            query_fields.push( body[ fields[ field ] ])
          }
          query += `WHERE ${key} = ?`
          query_fields.push( pointer )
          connection.query( query, query_fields, ( err, result ) => {
            if (!err) {
              connection.query(`SELECT * FROM ${table} where ${key}=?`, [ pointer ], ( err, rows ) => {
                if (!err) {
                  let table = rows[0]
                  if (table) {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(table))
                  } else {
                    res.setHeader('Content-Type', 'application/json')
                    res.status(404).end()
                  }
                } else {
                  throw err
                }
              })
            }else {
              throw err
            }
          })
        });



      /* -----------------------------------------------------------------------------
        * game delete
      */

        app.delete(`/api/game/:id`, function( req, res ) {
          let id =+req.params['id']

          connection.query( `DELETE FROM game WHERE id = ?`, [id], ( err, result ) => {
            if (!err) {
              res.status(204).end();
            } else {
                throw err;
            }
          })
        })











  const server = app.listen(8081, () => {


    // for( let route of config.routes ){
    //   //const endpoint = route.split( '/' )
    //   //if( endpoint[0] === 'get' ) endpoint[2]
    //   //? get( { table : endpoint[1], key : endpoint[2] } ) :
    //   get( { table : endpoint[1] } );

    // }
  })

})()
