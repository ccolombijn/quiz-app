const application = (function(){

  // model
  const model = (function(){
   const data = {}
   return {
     data : data
   }
  })()

  // view
  const view = (function(){

    const element = function( element ){

      if( ! typeof element === 'object' ) {
        if( element.contains( '.' ) ){
          element = document.querySelectorAll( element )
        } else {
           if ( ! element.contains( '#' ) ) element = `#${element}`
           element = document.querySelector( element )
        }
      }
      return element
    }

    const set = function( name, content ){
      if( typeof content === 'object' ) content = content.innerHTML
      element( name ).innerHTML = content
    }
    const add = function( parent, element, attributes ){
      parent = element( parent )
      if( ! typeof element === 'object' ) element = document.createElement( element )
      for( attribute of attributes ){
         element.setAttribute( attribute.attr, attribute.val )
      }
      parent.appendChild( element )
      return element
    }

    return {
      element : element,
      add : add,
      set : set
    }
  })()

  // controller
  const controller = (function(){

    const receptor = function( event ){
      const component = event.target.id // id of element added to controller acts as trigger to component to receptor
      const call = function( component ){
        console.log( component )
      }
    }

    const add = function( element, action, callback ){
      element = view.element( element )
      element.addEventListener( action, ( event ) => {
        //receptor( event )
        callback()
      })
    }

    return {
      add : add
    }
  })()



  const quiz = (function(){
    const init = function(){

    }
  })
})()
