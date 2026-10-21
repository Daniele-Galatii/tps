const url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";

fetch(url)
    .then(response => response.json())
    .then(dati => {

        const tabella = document.getElementById("tabella");

        const colonne = [
            "data",
            "totale_positivi",
            "nuovi_positivi",
            "terapia_intensiva",
            "deceduti"
        ];

        // Crea le intestazioni della tabella
        let intestazione = document.createElement("tr");

        colonne.forEach(colonna => {
            let th = document.createElement("th");
            th.textContent = colonna;
            intestazione.appendChild(th);
        });

        tabella.appendChild(intestazione);

        // Crea una riga per ogni giorno
        dati.forEach(giorno => {
            let riga = document.createElement("tr");

            colonne.forEach(chiave => {
                let td = document.createElement("td");
                td.textContent = giorno[chiave];
                riga.appendChild(td);
            });

            tabella.appendChild(riga);
        });

    });
