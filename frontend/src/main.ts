import '../style.css';

const root = document.getElementById('root')!;

root.innerHTML = `
<div class="bg-black min-h-screen text-white w-full flex flex-col items-center justify-center space-y-9 p-8">
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-8">PingPong</h1>
    <p class="text-lg">Playable game built only with variables and conditions.</p>
  </div>
  <div></div>
  <div class="flex space-x-6">
    <button class="bg-white text-black px-10 py-1 hover:bg-gray-200 transition">Login</button>
    <button class="bg-white text-black px-10 py-1 hover:bg-gray-200 transition">Register</button>
  </div>

  <div class="text-sm text-center">
    <p>Testing</p>
  </div>
</div>
`;

// const root = document.getElementById('root')!;

// root.innerHTML = `
//   <div class="bg-black min-h-screen w-full text-white p-8">
//     <h1 class="text-5xl font-bold mb-4">PingPong</h1>
//     <p class="text-lg">Playable game built only with variables and conditions.</p>
//   </div>
// `;
