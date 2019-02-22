class Quiz {
  constructor( id, name, questions ) {
    this._id = id
    this._name = name
    this._questions = questions

  }
  start(){
    const player = new Player
    player.add( () => {
      const time = Date.now()
      const quiz = new Game( this._id, time )
    })


  }

}
