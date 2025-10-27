// Lightweight typing effect + theme toggle + small helpers
(function(){
  // Typing effect (no dependency)
  const texts = ["Computer Vision", "Deep Learning", "System Design"];
  const el = document.querySelector('.typing');
  if(el){
    let idx = 0, char = 0, forward = true;
    const typeSpeed = 70;
    const pause = 900;
    function tick(){
      const current = texts[idx];
      if(forward){
        char++;
        el.textContent = current.slice(0,char);
        if(char === current.length){
          forward = false;
          setTimeout(tick, pause);
          return;
        }
      } else {
        char--;
        el.textContent = current.slice(0,char);
        if(char === 0){
          forward = true;
          idx = (idx+1) % texts.length;
        }
      }
      setTimeout(tick, forward ? typeSpeed : 30);
    }
    tick();
  }

  // Site is dark-only. The HTML root is set with `data-theme="dark"` by default.
  // No runtime theme switching to keep a simple, consistent look.
  const root = document.documentElement;

  // Smooth scroll for anchors
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href')||'';
    if(href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });

  // small reveal on scroll for .card
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('fade-in');
    });
  },{threshold:0.15});
  document.querySelectorAll('.card').forEach(c=>observer.observe(c));

})();
