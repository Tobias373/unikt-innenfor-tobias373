 // Dynamisk tabell
        const form = document.getElementById('dataForm');
        const tableBody = document.getElementById('dataTable').querySelector('tbody');
        const chartCanvas = document.getElementById('myChart');
        let chart;

        const data = [];

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const day = document.getElementById('day').value;
            const kg = parseFloat(document.getElementById('kg').value);

            // Legg til data i tabellen
            const row = document.createElement('tr');
            row.innerHTML = `<td>${day}</td><td>${kg}</td>`;
            tableBody.appendChild(row);

            // Legg til data i datasettet
            data.push({ day, kg });
            updateChart();

            // Nullstill skjema
            form.reset();
        });

        function updateChart() {
            const labels = data.map(entry => entry.day);
            const values = data.map(entry => entry.kg);

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kg avfall',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Quiz-funksjonalitet
        function checkAnswer(answer) {
            const result = document.getElementById('quizResult');
            if (answer === 'glass og metall') {
                result.textContent = 'Riktig! Glassflasker skal sorteres som glass og metall.';
                result.style.color = 'green';
            } else {
                result.textContent = 'Feil. Prøv igjen!';
                result.style.color = 'red';
            }
        }

        function checkAnswers() {
            let correct = 0;

            // Sjekk svar
            if (document.getElementById('q1b').checked) correct++;
            if (document.getElementById('q2a').checked) correct++;
            if (document.getElementById('q3c').checked) correct++;

            // Vis resultat
            document.getElementById('result').textContent = `Du fikk ${correct} av 3 riktige!`;
        }