const main = (function(){
  requirejs([
    'class/Quiz',
    'class/Category',
    'class/Game',
    'class/Question',
    'class/Player',
    'class/Team',
    'quiz-app'
  ], function(){
    quiz.init();
  })
})()
