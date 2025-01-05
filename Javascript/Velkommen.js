function greetUser() {
    const name = document.getElementById("nameInput").value;
    const messageContainer = document.getElementById("welcomeMessage");
  
    if (name.trim() !== "") {
      messageContainer.textContent = `Velkommen, ${name}! Takk for at du besøker nettsiden min.`;
    } else {
      messageContainer.textContent = "Velkommen til nettsiden min!";
    }
  }
  