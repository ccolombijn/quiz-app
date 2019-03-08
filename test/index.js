const expect = require('chai').expect;


describe('quiz', function () {
  /* ---------------------------------------------------------------------------
  * class Model
  */
    it('class Model', function () {
      const model = new Model
      assert.typeOf(model, 'object');
    }
    // model.apiRequest
    it('model.apiRequest', function () {
      const model = new Model
      const args = { component : 'test', data : 'value' }
      const callback = ( event, args ) => assert.typeOf(model.data.test, 'object');
      model.apiRequest( args, callback )
    }

    it('quiz.model', function () {
      const model = quiz.model
      assert.typeOf(model, 'object');
    });
  /* ---------------------------------------------------------------------------
  * class View
  */
    it('class View', function () {
      const model = new Model
      const view = new View( model )
      assert.typeOf(view, 'object');
    });
    // quiz.view
    it('quiz.view', function () {
      const view = quiz.view
      assert.typeOf(view, 'object');
    });
    // quiz.view.DOM
    it('quiz.view.DOM', function () {
      const DOM = quiz.view.DOM
      assert.typeOf(DOM, 'object');
    });
  /* ---------------------------------------------------------------------------
  * class Controller
  */
    it('class Controller', function () {
      const model = new Model
      const view = new View( model )
      const controller = new Controller( view, model )
      assert.typeOf(controller, 'object');
    });

    // quiz.controller
    it('quiz.controller', function () {
      const model = quiz.model()
      const view = quiz.view()
      const controller = quiz.controller( view, model )
    });
});
