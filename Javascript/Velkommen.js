function greetUser() {
  // Henter verdien fra input-feltet der brukeren skriver navnet sitt
  const name = document.getElementById("nameInput").value;
  
  // Henter elementet som skal vise velkomstmeldingen
  const messageContainer = document.getElementById("welcomeMessage");

  // Sjekker om brukeren har skrevet inn et navn
  if (name.trim() !== "") {
    // Hvis navnet ikke er tomt, viser en personlig velkomstmelding
    messageContainer.textContent = `Velkommen, ${name}! Takk for at du besøker nettsiden min.`;
  } else {
    // Hvis navnet er tomt, viser en generell velkomstmelding
    messageContainer.textContent = "Velkommen til nettsiden min!";
  }
}