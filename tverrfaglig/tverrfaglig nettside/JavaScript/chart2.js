    // Data: Restavfall per innbygger fra 2019 til 2023
        const labels = ["2019", "2020", "2021", "2022", "2023"];
        const data = [200, 195, 190, 185, 183]; // Eksempeldata

        // Konfigurer diagrammet
        const ctx = document.getElementById('wasteChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Restavfall per innbygger (kg)',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Utvikling i restavfall per innbygger (2019-2023)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Kg per innbygger'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'År'
                        }
                    }
                }
            }
        });