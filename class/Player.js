class Player {
  constructor( id, name, pointsTotal, gameId ) {
    this._id = id
    this._name = name
    this._pointsTotal = pointsTotal
    this._gameId = gameId
  }
  add( callback ){
    const screen = document.querySelector( '#screen' )
    const add_player = document.querySelector( '#add_player' )
    screen.innerHTML = add_player.innerHTML

    const add_player_form = document.querySelector( '#screen form' )
    add_player_form.addEventListener( 'submit', ( event ) => {
      event.preventDefault()
      const player_id = 0
      const player_name = event.target.elements.name.value
      const player_score = 0
    })

  }


}
