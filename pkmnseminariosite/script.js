

(function(){

  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.navbar a').forEach(a=>{
    if(a.getAttribute('href') === path){ a.classList.add('active'); }
  });
})();
