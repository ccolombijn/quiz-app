'use strict'
/*
* quiz/quiz.js
*/
const quiz = (function(){
  const game = function(){
    // game.data
    const data = {},
    // game.questions
    questions = [
      { question : 'Is  this question #1?', anwsers : [ 'Yes', 'No' ], right : 0 },
      { question : 'Is  this question #2?', anwsers : [ 'Yes', 'No' ], right : 0 },
      { question : 'Is  this question #3?', anwsers : [ 'Yes', 'No' ], right : 0 }
    ],
    teams = [],
    players = [],
    // game.player
    player = function(){
      const get = function( id ){
        for( let player of players ){
          if( parseInt( player.id ) === parseInt( id ) ) return player
        }
      },
      set = function( player ){
        for( let _player in players ){
          if( parseInt( players[ _player ].id ) === parseInt( player.id ) ) {
            players[ _player ] = player
          }
        }
      }
      add = function( player ) {
        player[ 'id' ] = players.length+1
        players.push( player )
      },
      score = function( player, score ){
        if( score ) {
          player.score =+ score
          set( player )
        }
      }
      return {
        get : get,
        set : set,
        add : add,
        score : score
      }
    }
    // game.question; display (random) question & anwsers
    const question = function(){

      screen().set( '#question' ) // display question screen
      const ask = ( anwser ) => { // display question with anwser as callback

        // TODO : get & display question & anwsers
        const _question = question().get() // get random question
        data[ 'question' ] = _question // save question to data
        screen().question( _question ) // display question
        screen().anwsers( _question ) // display anwsers
        anwser()  // TODO ; get the anwser & compare to _question.right; set player.score if right; display new question
      }
      const get = () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
        return questions[ getRandomInt( 1, questions.length ) ]
      }
      return{
        ask : ask,
        get : get
      }
    }
    // game.screen ; UI for the game session
    const screen = function( parent ){
      if( !parent ) parent = 'body'

      const main = () => {

        return document.querySelector( parent )
      },
      element = ( selector ) => {

        return main().querySelector( selector )
      },
      // screen.set; display a new screen
      set = function( screen, content ){

        if(content) {
          element( screen ).innerHTML =  content
          return element( screen )
        }else{
          element( 'section#screen' ).innerHTML = element( screen ).innerHTML
        }
      },
      add = function( element, parent ){
        element = document.createElement( element )
        parent ? element( parent ).appendChild( element ) : element( 'section#screen').appendChild( element )
        return element
      },
      // screen.question; display new question
      question = ( question ) =>{

          element( 'section#question' ).innerHTML = question.question
      },
      // screen.anwsers; display anwsers
      anwsers = ( question ) => {
        const anwsers = element( 'form#anwsers' )
        anwsers.id = question.id
        for( let anwser in question.anwsers ){
          // TODO : append anwsers elements
          const anwser_ = add( 'anwser', anwsers )

          input.id = anwser
        }
      }

      return {
        main : main,
        element : element,
        set : set,
        question : question
      }
    }
    // game.session
    const session = function(){

      const start = function(){

        question().ask( () => { // show random question

          action( ['input.anwser','click'], ()=>{ // anwser is clicked
            // TODO : anwser action in question.ask( right, wrong )?
            const question = data.question, // get question
            anwser = question.anwser, // get anwser
            anwsers = element( `form#${question.id}` ).elements
            for( let _anwser of anwsers ){
              if( _anwser.checked ){ // check anwser
                // TODO : display if anwser is right
                if( parseInt( _anwser.value ) === parseInt( anwser.right ) ){
                  // right anwser
                }else{
                  // wrong anwser
                }
              }
            }

          })
        })
      }
      return { start : start, data : data  }
    }

    // game.action; UI element events
    const action = function( action, callback ){
      screen().element( `${action[0]}` ).addEventListener( action[1], (event) =>{
        callback()
      })
    }
    // game.start; initiate new game
    const start = function(){
        screen().set( '#start' )
        // add new player
        action( ['button.add_player','click'] ,()=>{

          screen().set( 'add_player' )
          action( ['form.add_player','submit'] ,()=>{

            player().add( screen().element( 'form.add_player' ).elements )
            // start game session
            session().start()
          })
        })
    }

    return {
      data : data,
      session : session,
      players : players,
      teams : teams,
      player : player,
      start : start,
      screen : screen

    }

  }
  const template = function( screen ){
    return game().screen( '#templates' ).element( screen )
  }
  const init = function(){
    game().start()

  }
  return {
    game : game,
    template : template,
    init : init
  }
})()
