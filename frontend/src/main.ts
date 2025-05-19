import './style.css';

const app = document.getElementById('app')!;

app.innerHTML = `
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-4">PingPong</h1>
    <p class="text-lg">Playable game built only with variables and conditions.</p>
  </div>

  <div class="flex space-x-4">
    <button class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">Login</button>
    <button class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">Register</button>
  </div>

  <div class="text-sm">
    <p>Testing</p>
  </div>
`;
