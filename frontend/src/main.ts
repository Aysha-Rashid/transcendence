import '../style.css';

const root = document.getElementById('root')!;

root.innerHTML = `
<div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
  <div class="flex-grow flex flex-col items-center justify-center space-y-12">
  <div class="text-center">
    <h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
    <p class="text-lg font-mono ">Playable game built only with variables and conditions.</p>
  </div>
  <div></div>
  <div class="flex space-x-12">
    <button class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Login</button>
    <button class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Register</button>
  </div>
  </div>

  <div class="text-sm font-mono text-center mt-auto">
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
