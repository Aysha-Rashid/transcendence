import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('PingPong page loaded');

  const loginButton = document.querySelector('button:nth-child(1)');
  const registerButton = document.querySelector('button:nth-child(2)');

  loginButton?.addEventListener('click', () => {
    alert('Login button clicked!');
  });

  registerButton?.addEventListener('click', () => {
    alert('Register button clicked!');
  });
});