// Expandable rows: links stay in the HTML; JS only toggles visibility.
document.querySelectorAll('.xb').forEach(function(b){
  var p=document.getElementById(b.getAttribute('aria-controls'));
  b.addEventListener('click',function(){
    var o=b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded',String(!o));p.classList.toggle('on',!o);p.toggleAttribute('inert',o);
  });
});
