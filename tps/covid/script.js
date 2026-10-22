
const url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";

const richiesta = new XMLHttpRequest();

richiesta.open("GET", url, true);

richiesta.onload = function() {
    if (richiesta.status === 200) {

        const dati = JSON.parse(richiesta.responseText);
        const tabella = document.getElementById("tabella");

        for (let i = 0; i < dati.length; i++) {
            let riga = document.createElement("tr");

            riga.innerHTML =
                "<td>" + dati[i].data + "</td>" +
                "<td>" + dati[i].totale_positivi + "</td>" +
                "<td>" + dati[i].nuovi_positivi + "</td>" +
                "<td>" + dati[i].terapia_intensiva + "</td>" +
                "<td>" + dati[i].deceduti + "</td>";

            tabella.appendChild(riga);
        }
    }
};

richiesta.send();
