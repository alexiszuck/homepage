const netlifyIdentity = require('netlify-identity-widget');

netlifyIdentity.init({
  container: '.container',
  APIUrl: 'https://alexiszuck.netlify.com/.netlify/identity'
});

(function(){
  
netlifyIdentity.on('init', user => console.log('init', user));
netlifyIdentity.on('login', user => console.log('login', user));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));


document.getElementById("signup").addEventListener("click", function(e) {
  e.preventDefault(); console.log('test');
  netlifyIdentity.open('signup');
});
  
})();