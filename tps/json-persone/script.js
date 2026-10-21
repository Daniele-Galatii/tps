fetch("persone.json")
    .then(response => response.json())
    .then(persone => {

        const tabella = document.getElementById("tabella");

        persone.forEach(persona => {
            let riga = document.createElement("tr");

            let nome = document.createElement("td");
            nome.textContent = persona.nome;

            let cognome = document.createElement("td");
            cognome.textContent = persona.cognome;

            let sport = document.createElement("td");
            sport.textContent = persona.sport[0].tipo1 + ", " + persona.sport[0].tipo2;

            let eta = document.createElement("td");
            eta.textContent = persona.eta;

            riga.appendChild(nome);
            riga.appendChild(cognome);
            riga.appendChild(sport);
            riga.appendChild(eta);

            tabella.appendChild(riga);
        });

    });
