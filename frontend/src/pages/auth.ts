// Import root from main.ts (ensure it's exported there)
import { root } from '../main.ts';
import { homepage } from '../main.ts'; // Ensure homepage is defined in main.ts

// Function to store user data via API
function store(username: string, password: string, formId: string) {
  const isRegisterForm = formId === 'registerForm';
  const endpoint = isRegisterForm ? '/api/register' : '/api/login';

  fetch(`https://localhost:5000${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    // Uncomment and adjust if self-signed certificate issues persist
    // agent: new (require('https').Agent)({
    //   rejectUnauthorized: false,
    // }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          throw { message: data.error, field: determineErrorField(data.error) };
        }
        throw new Error('Something went wrong');
      }
      return data;
    })
    .then((data) => {
      console.log('Success:', data);
      window.location.href = '/home'; // Redirect on success
    })
    .catch((error: { message: string; field?: string }) => {
      console.error('Registration/Login error:', error.message);
      displayError(error.message, error.field || '', formId);
    });
}

// Function to determine which field caused the error based on the message
function determineErrorField(errorMessage: string): string {
  if (errorMessage.includes('username')) return 'username';
  if (errorMessage.includes('password')) return 'password';
  return ''; // Default if field can't be determined
}

function displayError(message: string, fieldId: string, formId: string) {
  // Remove existing error for this field if it exists
  const existingError = document.getElementById(`error-${fieldId}`);
  if (existingError) existingError.remove();

  // Highlight the input field with red border
  const input = document.getElementById(fieldId) as HTMLInputElement;
  if (input && fieldId) {
    input.style.borderColor = 'red';
    input.style.borderWidth = '2px';
  } else {
    // If fieldId is empty, show a general error
    fieldId = 'general'; // Use a generic ID for non-field-specific errors
  }

  // Create new error div
  const errorDiv = document.createElement('div');
  errorDiv.id = `error-${fieldId}`;
  errorDiv.textContent = message;
  errorDiv.style.color = 'red';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '4px';

  // Attach error below the relevant input field or at the top if general
  if (input) {
    input.parentNode?.insertBefore(errorDiv, input.nextSibling);
  } else {
    const form = document.getElementById(formId) || document.body;
    form.insertBefore(errorDiv, form.firstChild);
  }

  // Optional: Remove error and reset border after a few seconds
  // setTimeout(() => {
  //   if (errorDiv.parentNode) errorDiv.remove();
  //   if (input) {
  //     input.style.borderColor = '';
  //     input.style.borderWidth = '';
  //   }
  // }, 5000);
}

export function showLoginForm(): void {
  root.innerHTML = `
    <div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
      <div class="flex-grow flex flex-col items-center justify-center space-y-12">
        <div class="text-center">
          <h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
          <p class="text-lg font-mono">Playable game built only with variables and conditions.</p>
        </div>
        <form id="loginForm" class="flex flex-col space-y-4">
          <div class="relative group">
            <input type="text" id="username" placeholder="Username" class="bg-white text-black p-2 w-full border border-gray-300 rounded" required>
            <span class="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" />
                <path d="M9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" />
              </svg>
            </span>
            <span class="absolute right-2 top-7 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded shadow-md z-10">
              Username must be 3-20 characters
            </span>
          </div>
          <div class="relative group">
            <input type="password" id="password" placeholder="Password" class="bg-white text-black p-2 w-full border border-gray-300 rounded" required>
            <span class="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" />
                <path d="M9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" />
              </svg>
            </span>
            <span class="absolute right-2 top-7 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded shadow-md z-15">
              Password must be at least 6 characters
            </span>
          </div>
          <button type="submit" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Login</button>
          <button type="button" id="backBtn" class="mt-4 text-white underline font-mono">← Back</button>
        </form>
      </div>
      <div class="text-sm font-mono text-center mt-auto">
        <p>Testing</p>
      </div>
    </div>
  `;

  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;
      // Assuming store function exists (from previous context)
      store(username, password, 'loginForm');
    }
  });

  const backBtn = document.getElementById('backBtn');
  backBtn?.addEventListener('click', homepage);
}

export function showRegisterForm() {
  root.innerHTML = `
    <div class="bg-black min-h-screen text-white w-full flex flex-col items-center p-8">
      <div class="flex-grow flex flex-col items-center justify-center space-y-12">
        <div class="text-center">
          <h1 class="text-5xl font-bold font-mono mb-8">PingPong</h1>
          <p class="text-lg font-mono">Playable game built only with variables and conditions.</p>
        </div>
        <form id="registerForm" class="flex flex-col space-y-4">
        <div class="relative group">
          <input type="text" id="username" placeholder="Username" class="bg-white text-black p-2 w-full border border-gray-300 rounded" required>
          <span class="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" />
              <path d="M9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12Z" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" />
            </svg>
          </span>
          <span class="absolute right-2 top-7 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded shadow-md z-10">              Username must be 3-20 characters
          </span>
        </div>
        <div class="relative group">
          <input type="password" id="password" placeholder="Password" class="bg-white text-black p-2 w-full border border-gray-300 rounded" required>
          <span class="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" />
              <path d="M9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12Z" />                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z" />
              </svg>
          </span>
          <span class="absolute right-2 top-7 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded shadow-md z-15">
            Password must be at least 6 characters
          </span>
        </div>
        <button type="submit" class="bg-white font-mono text-black px-12 py-1 hover:bg-gray-200 transition">Register</button>
        <button type="button" id="backBtn" class="mt-4 text-white underline font-mono">← Back</button>
        </form>
      </div>
      <div class="text-sm font-mono text-center mt-auto">
        <p>Testing</p>
      </div>
    </div>
  `;
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    store(username, password, 'registerForm');
  });
  document.getElementById('backBtn')?.addEventListener('click', homepage);
}