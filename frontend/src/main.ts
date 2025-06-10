import './input.css';
import { showLoginForm } from './pages/auth.ts';
import { showRegisterForm } from './pages/auth.ts';

export const root = document.getElementById('root')!;

export function homepage() {
	root.innerHTML = 
	`<div class="bg-black min-h-screen w-full flex flex-col items-center text-white font-mono">
		<div class="flex-grow flex flex-col items-center justify-center space-y-12 px-4">
			<div class="text-center">
				<h1 class="text-5xl font-bold mb-8">PingPong</h1>
				<p class="text-lg">Playable game built only with variables and conditions.</p>
			</div>
			<div class="flex space-x-12">
				<button id="loginBtn" class="bg-white text-black px-12 py-2 hover:bg-gray-300 transition rounded">
					Login
				</button>
				<button id="registerBtn" class="bg-white text-black px-12 py-2 hover:bg-gray-300 transition rounded">
					Register
				</button>
			</div>
		</div>

		<div class="text-sm text-center mb-6">
			<p>Testing</p>
		</div>
	</div>`;

	document.getElementById("loginBtn")?.addEventListener("click", showLoginForm);
	document.getElementById("registerBtn")?.addEventListener("click", showRegisterForm);
}

homepage();
