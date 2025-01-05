// Holder styr på radnummer
let radTeller = 1;

// Funksjon som legger til en ny rad i tabellen
function leggTilRad() {
  // Henter input-feltet der brukeren skriver data
  const input = document.getElementById("brukerInput");
  // Henter tabellen og peker til <tbody> for å legge til nye rader
  const tabell = document.getElementById("dataTabell").getElementsByTagName("tbody")[0];

  // Sjekker om input-feltet ikke er tomt
  if (input.value.trim() !== "") {
    // Oppretter en ny rad i tabellen
    const nyRad = tabell.insertRow();

    // Oppretter en celle for radnummer
    const celleNummer = nyRad.insertCell(0);
    // Setter inn radnummeret i den første cellen og øker radTeller
    celleNummer.textContent = radTeller++;

    // Oppretter en celle for brukerens data
    const celleData = nyRad.insertCell(1);
    // Setter inn teksten fra input-feltet i den andre cellen
    celleData.textContent = input.value;

    // Tømmer input-feltet etter at dataen er lagt til tabellen
    input.value = "";
  } else {
    // Viser en advarsel hvis input-feltet er tomt
    alert("Vennligst skriv inn noe før du legger til!");
  }
}