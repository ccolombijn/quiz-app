// model
const model = (function(){
 const data = {},
       components = [],
  //...........................................................................

       obj = (obj) => {
         return {
           properties : Object.getOwnPropertyNames(obj),
           values : Object.values(obj)
         }
       },

  //...........................................................................

       add = (data) => {
         for (let item in obj(data).properties)
           data[obj(data).properties[item]] = obj(data).values[item];
       },

   //...........................................................................

       component = ( component ) => {
         if( component.selector ) component = component.selector;
         return data[component];
       },

   //...........................................................................

       apiRequest = ( args, callback ) => {
         let xhr = new XMLHttpRequest()
         if( !args ) args = {}
         if( !args.type ) args[ 'type' ] = 'GET'
         if( !args.status ) args[ 'status' ] = 200
         if( !callback ) callback = response;
         xhr.addEventListener( 'load',  ( event ) => {
           if ( xhr.readyState === 4 && xhr.status === args.status ) {
             model.data[args.component] = JSON.parse(event.target.responseText)
             callback( event, args )
           }
         })
         xhr.open( args.type, `http://localhost:8081/api/${args.component}`, true )
         xhr.send( args.data )
       }

  //...........................................................................
 return {
   data : data,
   components : components,
   component : component,
   apiRequest : apiRequest
 }
})()
// -----------------------------------------------------------------------------
// view
const view = (function(){
  const elements = [],
        get = function( id ){
          for( let element of elements ){
            if( element.id === id ){
              return element.element
            }
          }
        },

  //...........................................................................

        element = function( element ){
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
        },


  //...........................................................................

      set = function( _element, content ){
        if( typeof content === 'object' ) content = content.innerHTML
        element( _element ).innerHTML = content
      },

  //...........................................................................

      txt = function( _element, txt ){
        txt = document.createTextNode( txt )
        element( _element ).appendChild( txt )
      },

  //...........................................................................

      attr = function( _element, attributes ){
        const properties = Object.getOwnPropertyNames(attributes)
        for( let attribute in properties ){
            _element.setAttribute(
              properties[ attribute ],
              Object.values( attributes )[ attribute ]
            )

        }
        return _element
      },

  //...........................................................................

    add = function( parent, _element, attributes, content ){

      if( typeof parent === 'string' ) parent = element( parent );
      if( typeof _element === 'string' ) _element = document.createElement( _element )
      if( typeof attributes === 'object' ) _element = attr( _element , attributes )
      if( typeof attributes === 'string' ) content = attributes
      if( typeof content === 'string' ) txt( _element, content )
      parent.appendChild( _element )
      return _element
    }


  //...........................................................................
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

  const actions = [],
  events = [],
  //...........................................................................

  add = function( element, action, callback ){

    view.element(element ).addEventListener( action, ( event ) => {
      events.push( event )
      event.preventDefault()
      event.stopPropagation();
      callback( event )
      //receptor( event )
    })
  },
  //...........................................................................

  receptor = function(event) {
    const component = event.target.id; // id of element added to controller acts as trigger to component to receptor
    for (let action of this.actions) {
      if (action.component === component) action.do();
    }
  },

  //...........................................................................

  component = function(element, event, action) {
    actions.push({ component: element.id, event : event, do: action });
  }

  //...........................................................................
  return {
    events : events,
    add : add,
    component : component
  }
})()
