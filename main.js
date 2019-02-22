const main = (function(){
  requirejs([
    'data',
    'class/Quiz',
    'class/Category',
    'class/Game',
    'class/Question',
    'class/Player',
    'class/Team',
    //'quiz-app'
    'quiz-mvc'
  ], function(){
    //quiz().init();
    const name = 'My new Quiz'
    const id = 0
    const questions = data.questions
    const quiz = new Quiz( name, id, questions )
    quiz.start()
  })
})()
