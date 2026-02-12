NEXT_BUTTON.addEventListener('click', () => {

    if (wolvesAlive.length === 0) {
        window.location.href = "19_villagers_win.html"; 
    } else if (villagersAlive.length === wolvesAlive.length) {
        window.location.href = "20_wolves_win.html"; 
    } else {
        window.location.href = "next-phase.html"; 
    }

});

NEXT_BUTTON.addEventListener('click', () => {

    if (wolvesAlive.length === 0) {
        window.location.href = "19_villagers_win.html"; 
    } else if (villagersAlive.length === wolvesAlive.length) {
        window.location.href = "20_wolves_win.html"; 
    } else {
        window.location.href = "17_reveal_murder_villagers.html"; 
    }

});

// BOTON PREVIOUS

// Guardar un historial en localStorage - Al hacer NEXT:

// Guardar estado actual en historial
let history = JSON.parse(localStorage.getItem('playersHistory')) || [];
history.push(JSON.stringify(players)); // guardamos snapshot del estado actual
localStorage.setItem('playersHistory', JSON.stringify(history));

// Luego seguimos con la lógica de NEXT
localStorage.setItem("playersData", JSON.stringify(players));


// Volver atrás. Al pulsar PREVIOUS:

PREVIOUS_BUTTON.addEventListener('click', () => {
    let history = JSON.parse(localStorage.getItem('playersHistory')) || [];

    if (history.length > 0) {
        history.pop(); // eliminamos el estado actual (última fase)
        const previousState = history[history.length - 1] || JSON.stringify(players); // snapshot previo

        localStorage.setItem('playersData', previousState); // restauramos el estado previo
        localStorage.setItem('playersHistory', JSON.stringify(history)); // actualizamos historial
    }

    window.location.href = "previous-screen.html";
});



// Reveal roles one by one 

ddocument.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    let currentPlayerIndex = 0;

    const S_NAME = document.getElementById('player-name');
    const P_MESSAGE = document.getElementById('message');
    const DIV_IMAGE = document.getElementById('div-image');
    const BTN_SHOW = document.getElementById('show-role-btn');
    const BTN_HIDE = document.getElementById('hide-role-btn');
    const BTN_NEXT = document.getElementById('next-player-btn');

    function loadPlayer(index) {
        const player = players[index];
        S_NAME.textContent = player.name;
        P_MESSAGE.textContent = "Let's see your role!";
        DIV_IMAGE.className = "card-holder"; // reset placeholder

        BTN_SHOW.classList.remove('hide');
        BTN_HIDE.classList.add('hide');
        BTN_NEXT.classList.add('hide');
    }

    BTN_SHOW.addEventListener('click', () => {
        const player = players[currentPlayerIndex];

        P_MESSAGE.textContent = `You are a ${player.role}`;
        BTN_SHOW.classList.add('hide');
        BTN_HIDE.classList.remove('hide');

        // Cambiar imagen según rol
        DIV_IMAGE.className = "card-holder"; // reset
        if(player.role === "Wolf") DIV_IMAGE.classList.add("wolf-image-input");
        else if(player.role === "Seer") DIV_IMAGE.classList.add("seer-image-input");
        else DIV_IMAGE.classList.add("villager-image-input");
    });

    BTN_HIDE.addEventListener('click', () => {
        P_MESSAGE.textContent = "All set! Tap Next and pass the device.";
        BTN_HIDE.classList.add('hide');
        BTN_NEXT.classList.remove('hide');
        DIV_IMAGE.className = "card-holder"; // vuelve al placeholder
    });

    BTN_NEXT.addEventListener('click', () => {
        currentPlayerIndex++;
        if(currentPlayerIndex < players.length){
            loadPlayer(currentPlayerIndex);
        } else {
            window.location.href = "player-killed-wolves-1.html";
        }
    });

    // Carga inicial del primer jugador
    loadPlayer(currentPlayerIndex);
});
