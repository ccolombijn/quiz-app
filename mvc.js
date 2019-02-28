// model
const model = (function(){
 const data = {}
 const update = function( args, callback ){
   const tmpData = []
   for( let item in model.data[ args.data ] ){
     if( args.match === model.data[ args.data ][item ][ args.key ] ){
       switch (args.action) {
        case 'add':
          if( args.target ){
            // model.update({data:'arrayName',key:'id',match:0,target:'fieldToAddTo'})
            model.data[ args.data ][item ][ args.target ]++
          }else{

          }

          break;
        case 'substract':
          model.data[ args.data ][item ][ args.target ]--
          break;


       }
     }
   }
 }
 return {
   data : data
 }
})()
// -----------------------------------------------------------------------------
// view
const view = (function(){
  const elements = []
  const get = function( id ){
    for( let element of elements ){
      if( element.id === id ){
        return element.element
      }
    }
  }
  const element = function( element ){
    if( get( element ) ) return get( element )
    if( typeof element === 'string' ) {


      if( element.includes( '.' ) ){
        element = (() => document.querySelectorAll( element ))()
      } else {
         if ( ! element.includes( '#' ) ) element = `#${element}`
         element = (() => document.querySelector( element ))()
      }

    }

    if( ! element.id ) element.id = `view_element_${elements.length+1}`
    elements.push( { id : element.id, element : element } )

    return element
  }

  const set = function( _element, content ){
    if( typeof content === 'object' ) content = content.innerHTML

    element( _element ).innerHTML = content
  }
  const txt = function( _element, txt ){
    txt = document.createTextNode( txt )
    element( _element ).appendChild( txt )
  }
  const attr = function( _element, attributes ){

    for( let attribute in Object.getOwnPropertyNames(attributes) ){
        _element.setAttribute( Object.getOwnPropertyNames(attributes)[ attribute ], Object.values( attributes )[ attribute ] )

    }
    return _element
  }
  const add = function( parent, _element, attributes, content ){

    if( typeof parent === 'string' ) get( parent ) ? parent = get( parent ) : parent = element( parent )
    if( typeof _element === 'string' ) _element = document.createElement( _element )
    if( typeof attributes === 'object' ) _element = attr( _element , attributes )
    if( typeof attributes === 'string' ) content = attributes
    if( typeof content === 'string' ) txt( _element, content )
    parent.appendChild( _element )
    return _element
  }

  return {
    elements : elements,
    element : element,
    get : get,
    add : add,
    set : set,
    txt : txt,
    attr : attr
  }
})()
// -----------------------------------------------------------------------------
// controller
const controller = (function(){

  const add = function( element, action, callback ){

    view.element(element ).addEventListener( action, ( event ) => {
      event.preventDefault()
      callback( event )
      //receptor( event )
    })
  }

  return {
    add : add
  }
})()
