async function fetchData() {
  try {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    const data = await response.json();

    document.querySelector("#card1 .value").textContent = data.cases.toLocaleString();
    document.querySelector("#card2 .value").textContent = data.deaths.toLocaleString();
    document.querySelector("#card3 .value").textContent = data.recovered.toLocaleString();
  } catch (error) {
    console.error("Erreur lors du chargement :", error);
  }
}

fetchData();
async function fetchHistoricalData() {
  try {
    const response = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=10");
    const data = await response.json();

    const labels = Object.keys(data.cases);
    const cases = Object.values(data.cases);
    const deaths = Object.values(data.deaths);
    const recovered = Object.values(data.recovered);

    const ctx = document.getElementById("casesChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cas confirmés",
            data: cases,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Décès",
            data: deaths,
            borderColor: "red",
            fill: false,
          },
          {
            label: "Guérisons",
            data: recovered,
            borderColor: "green",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });
  } catch (error) {
    console.error("Erreur graphique :", error);
  }
}

fetchHistoricalData();