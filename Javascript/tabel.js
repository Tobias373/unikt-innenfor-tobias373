// Holder styr på radnummer
let radTeller = 1;

// Funksjon som legger til en ny rad i tabellen
function leggTilRad() {
  const input = document.getElementById("brukerInput");
  const tabell = document.getElementById("dataTabell").getElementsByTagName("tbody")[0];
  
  if (input.value.trim() !== "") { // Sjekker at input ikke er tom
    // Oppretter en ny rad
    const nyRad = tabell.insertRow();

    // Celle for radnummer
    const celleNummer = nyRad.insertCell(0);
    celleNummer.textContent = radTeller++;

    // Celle for brukerens data
    const celleData = nyRad.insertCell(1);
    celleData.textContent = input.value;

    // Tømmer input-feltet etter innsending
    input.value = "";
  } else {
    alert("Vennligst skriv inn noe før du legger til!");
  }
}
