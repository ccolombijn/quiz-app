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

const config = {
  db : {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'quiz'
  }
}

const connection = mysql.createConnection( config.db )
const get = function( args, callback ){
  const table = args.table,
  key = args.key
  if( !key )
  if( key ){
    app.get( `/api/${table}/:${key}`, function( req, res ) {

      let pointer = +req.params[ key ]
      // bad request
      if( pointer.indexOf( '=' ) ){
        res.setHeader('Content-Type', 'application/json')
        res.status(400).end()
        return
      }
      connection.query(`SELECT * FROM ${table} where ${key}=?`, pointer, ( err, rows ) => {
        if (!err) {
          let record = rows[0];
          res.setHeader('Content-Type', 'application/json')
          record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
        } else {
          throw err
        }
      })
    })
  } else {
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
  }
  if( callback ) callback()
}

get( { table : 'game' } )
