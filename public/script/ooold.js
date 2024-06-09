document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const textBox = document.querySelector('.text');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.getAttribute('data-text');
      textBox.textContent = text;

      
      menuItems.forEach(menu => {
        menu.classList.remove('active');
      });

      
      item.classList.add('active');
    });
  });





});
