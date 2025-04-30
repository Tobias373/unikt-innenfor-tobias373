// REGISTRERING
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
  
  // LOGIN
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
  
    if (res.ok) hentAlleKommentarer();
  }
  
  // SEND KOMMENTAR
  async function sendKommentar() {
    const kommentar = document.getElementById("kommentar").value;
    if (!kommentar.trim()) {
      document.getElementById("response-msg").textContent = "Kommentaren kan ikke være tom.";
      return;
    }
  
    const res = await fetch("/kommentar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: kommentar })
    });
  
    const data = await res.json();
    document.getElementById("response-msg").textContent = data.msg;
  
    if (res.ok) {
      document.getElementById("kommentar").value = "";
      hentAlleKommentarer();
    }
  }
  
  // HENT KOMMENTARER
  async function hentAlleKommentarer() {
    const res = await fetch("/kommentar");
    const kommentarer = await res.json();
    const div = document.getElementById("alle-kommentarer");
    div.innerHTML = "";
  
    kommentarer.forEach((kom) => {
      const p = document.createElement("p");
      p.textContent = `${kom.username}: ${kom.content}`;
      div.appendChild(p);
    });
  }
  
  window.onload = hentAlleKommentarer;

  