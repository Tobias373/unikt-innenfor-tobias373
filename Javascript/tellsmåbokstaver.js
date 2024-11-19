        function tellBokstaver(str) {
            // Teller små bokstaver i en streng
            let count = 0;
            
            for (let i = 0; i < str.length; i++) {
                if (str[i] >= 'a' && str[i] <= 'å') {
                    count++;
                }
            }
            
            return count;
        }

        function tellSmåBokstaver() {
            // Ber brukeren om å skrive inn en tekst
            let brukerInput = prompt("Skriv inn en tekst for å telle små bokstaver:");
            let antall = tellBokstaver(brukerInput);
            alert("Antall små bokstaver: " + antall);
        }
