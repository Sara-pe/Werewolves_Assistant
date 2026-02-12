// Reveal roles one by one 

document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));

    console.log("Info players:", players);

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
       
        if(player.role === "Wolf") DIV_IMAGE.classList.add("wolf-image-input");
        else if(player.role === "Seer") DIV_IMAGE.classList.add("seer-image-input");
        else DIV_IMAGE.classList.add("villager-image-input");
    });

    BTN_HIDE.addEventListener('click', () => {
        P_MESSAGE.textContent = "All set! Tap Next and pass the device.";
        BTN_HIDE.classList.add('hide');
        BTN_NEXT.classList.remove('hide');
        DIV_IMAGE.className = "image-input"; // vuelve al placeholder
    });

    BTN_NEXT.addEventListener('click', () => {
        currentPlayerIndex++;
        DIV_IMAGE.className = "image-input";
        if(currentPlayerIndex < players.length){
            loadPlayer(currentPlayerIndex);
        } else {
            window.location.href = "7_intro_game.html";
        }
    });

    // Carga inicial del primer jugador
    loadPlayer(currentPlayerIndex);
});
