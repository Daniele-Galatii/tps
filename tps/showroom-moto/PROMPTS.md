# Diario dei prompt – Showroom Moto

## Prompt v1 – Creazione base progetto
"Genera una mini webapp front-end per uno showroom di moto utilizzando solo HTML, CSS e JavaScript (senza API esterne). 
La webapp deve avere almeno 3 pagine distinte: Home, Catalogo e Preferiti. 
Struttura semplice ma funzionante, con collegamenti tra le pagine."

---

## Prompt v2 – Struttura semantica e accessibilità
"Migliora la struttura HTML rendendola semantica utilizzando tag come header, nav, main, section e footer. 
Aggiungi elementi di accessibilità: attributi aria-label dove necessario, immagini con alt descrittivo, 
link 'salta al contenuto', focus visibile per la navigazione da tastiera. 
Implementa anche una navbar responsive con hamburger menu per dispositivi mobili."

---

## Prompt v3 – Funzionalità catalogo
"Implementa nella pagina catalogo:
- una barra di ricerca con aggiornamento dinamico
- filtro per categoria (motard, sportiva, naked)
- ordinamento per nome, prezzo e anno
- pulsante di reset per azzerare i filtri

Le modifiche devono aggiornare dinamicamente i risultati senza ricaricare la pagina."

---

## Prompt v4 – Modale e sicurezza
"Aggiungi una finestra modale per mostrare i dettagli completi di una moto quando si clicca su 'Dettagli'. 
La modale deve chiudersi con:
- tasto ESC
- click fuori dalla modale
- pulsante di chiusura

Evita rischi di sicurezza: non inserire contenuti utente con innerHTML, 
ma usa createElement e textContent per generare dinamicamente il DOM."

---

## Prompt v5 – Preferiti e localStorage
"Implementa un sistema di preferiti:
- possibilità di aggiungere/rimuovere una moto
- salvataggio dei dati in localStorage
- badge numerico aggiornato nella navbar
- pagina dedicata ai preferiti

Aggiungi notifiche toast quando una moto viene aggiunta o rimossa."

---

## Prompt v6 – Tema e form
"Aggiungi:
- tema dark/light con toggle e salvataggio in localStorage
- un form per richiedere test ride con validazione client-side

Il form deve includere:
- campi obbligatori
- validazione email
- messaggi di errore vicino ai campi
- blocco invio se dati non validi"

---

## Prompt v7 – Miglioramento grafico e responsive
"Rifinisci l'interfaccia grafica:
- utilizza variabili CSS (:root) per colori e spaziature
- layout con Flexbox e Grid
- breakpoint responsive almeno a 768px e 1024px
- stile coerente tra tutte le pagine
- aggiungi transizioni leggere su hover e interazioni

Obiettivo: ottenere un design moderno, pulito e coerente tra Home, Catalogo e Preferiti."
