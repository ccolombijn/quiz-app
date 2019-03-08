
"use strict";

const api = (function(){

  const mysql = require( 'mysql' )
  const express = require( 'express' )
  const app = express()
  const bodyParser = require( 'body-parser')
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
    }
  }

  const connection = mysql.createConnection( config.db )
  const requests = [
    { table : '', key : '' }
  ]
  for( let request of requests ){
    let table = request.table
    let key = request.key

    // get
    app.get( `/api/${table}/:${key}`, function( req, res ) {
      let key =+ req.params[ key ]
      connection.query(`SELECT * FROM ${table} where ${key}=?`, key, ( err, rows ) => {
        if (!err) {
          let record = rows[0];
          res.setHeader('Content-Type', 'application/json')
          record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
        } else {
          throw err
        }
      })
    })

    app.get(`/api/${table}`, function(req, res) {
      res.setHeader('Content-Type', 'application/json')
      connection.query(`SELECT * FROM ${table}`, ( err, records ) => {
        if (!err) {
          res.end( JSON.stringify(records) )
        } else {
          throw err
        }
      })
    })

    // put
    app.put( `/api/${table}/:${key}`, function( req, res ) {

      let pointer = +req.params[ key ]
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
    })

    // delete
    app.delete(`/api/${table}/:${key}`, function( req, res ) {
      connection.query( `DELETE FROM ${table} WHERE ${key} = ?`, parseInt(req.params[ key ]), ( err, result ) => {
        if (!err) {
          res.status(204).end();
        } else {
            throw err;
        }
      })
    })

  }// for( let request of requests ){


  const server = app.listen(8081, () => {
    console.log( 'Server listening on port 8081')
  })

})()
