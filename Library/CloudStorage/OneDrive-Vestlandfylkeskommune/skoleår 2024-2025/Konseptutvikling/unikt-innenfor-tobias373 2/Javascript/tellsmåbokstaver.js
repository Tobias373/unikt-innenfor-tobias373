function tellBokstaver(str) {
    // Teller små bokstaver i en streng
    let count = 0; // Variabel for å holde antall små bokstaver

    // Gå gjennom hvert tegn i strengen
    for (let i = 0; i < str.length; i++) {
        // Sjekk om tegnet er en liten bokstav mellom 'a' og 'å'
        if (str[i] >= 'a' && str[i] <= 'å') {
            count++; // Øk antallet hvis tegnet er en liten bokstav
        }
    }

    return count; // Returnerer det totale antallet små bokstaver
}

function tellSmåBokstaver() {
    // Ber brukeren om å skrive inn en tekst
    let brukerInput = prompt("Skriv inn en tekst for å telle små bokstaver:");

    // Sjekker om brukeren skrev noe inn
    if (!brukerInput) {
        alert("Du skrev ikke inn noe!"); // Viser en melding hvis ingen tekst ble skrevet
        return; // Avslutter funksjonen hvis input er tom
    }

    // Kaller funksjonen for å telle små bokstaver i brukerens tekst
    let antall = tellBokstaver(brukerInput);

    // Viser antall små bokstaver i et popup-vindu
    alert("Antall små bokstaver: " + antall);
}
