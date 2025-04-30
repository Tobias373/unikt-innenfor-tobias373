async function register() {
  const username = document.getElementById("reg-user").value;
  const password = document.getElementById("reg-pass").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  document.getElementById("response-msg").textContent = data.msg;
}

async function login() {
  const username = document.getElementById("login-user").value;
  const password = document.getElementById("login-pass").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  document.getElementById("response-msg").textContent = data.msg;
}
