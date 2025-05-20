import '../style.css';

type UserType = {
	UserName: string;
	Password: string;
	retire: (date: Date) => void;
};

const User: UserType = {
	UserName: "",
	Password: "",
	retire: (date: Date) => {
		console.log("Retiring on", date);
	}
};

function store(UserName: string, Password: string) {
	if (UserName && Password) {
		User.UserName = UserName;
		User.Password = Password;
		console.log("User stored:", User);
	} else {
		console.error("Username and password are required");
	}
}

const root = document.getElementById('root')!;

function homepage(){
	root.innerHTML = 
	`<div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
		<div class="flex-grow flex flex-col items-center justify-center space-y-12">
			<div class="text-center">
				<h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
				<p class="text-lg font-mono ">Playable game built only with variables and conditions.</p>
			</div>
			<div></div>
			<div class="flex space-x-12">
				<button id="loginBtn" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Login</button>
				<button id="registerBtn" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Register</button>
			</div>
		</div>
	
		<div class="text-sm font-mono text-center mt-auto">
			<p>Testing</p>
		</div>
	</div>`
	;
	document.getElementById("loginBtn")?.addEventListener("click", showLoginForm);
	document.getElementById("registerBtn")?.addEventListener("click", showRegisterForm);

}

function showLoginForm()
{
	root.innerHTML = 
	`<div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
		<div class="flex-grow flex flex-col items-center justify-center space-y-12">
			<div class="text-center">
				<h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
				<p class="text-lg font-mono ">Playable game built only with variables and conditions.</p>
			</div>
	
			<form id="loginForm" class="flex flex-col space-y-4">
				<input type="text" id="username" placeholder="Username" class="text-black p-2" required>
				<input type="password" id="password" placeholder="Password" class="text-black p-2" required>
				<button type="submit" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Login</button>
				<button type="button" id="backBtn" class="mt-4 text-white underline font-mono">← Back</button>
			</form>
		</div>
	
		<div class="text-sm font-mono text-center mt-auto">
			<p>Testing</p>
		</div>
	</div>`
	;
	document.getElementById("loginForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		const username = (document.getElementById("username") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		store(username, password);
	});
	document.getElementById("backBtn")?.addEventListener("click", homepage);
}

function showRegisterForm()
{
	root.innerHTML = 
	`<div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
		<div class="flex-grow flex flex-col items-center justify-center space-y-12">
			<div class="text-center">
				<h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
				<p class="text-lg font-mono ">Playable game built only with variables and conditions.</p>
			</div>
	
			<form id="registerForm" class="flex flex-col space-y-4">
				<input type="text" id="username" placeholder="Username" class="text-black p-2" required>
				<input type="password" id="password" placeholder="Password" class="text-black p-2" required>
				<button type="submit" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Register</button>
				<button type="button" id="backBtn" class="mt-4 text-white underline font-mono">← Back</button>
			</form>
		</div>
	
		<div class="text-sm font-mono text-center mt-auto">
			<p>Testing</p>
		</div>
	</div>`
	;
	document.getElementById("registerForm")?.addEventListener("submit", (e) => {
		e.preventDefault();
		const username = (document.getElementById("username") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement).value;
		store(username, password);
	});
	document.getElementById("backBtn")?.addEventListener("click", homepage);
}
homepage();