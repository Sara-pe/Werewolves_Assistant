document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);



    // ==============================================
    //    SECTION ROW PLAYERS 
    // ==============================================


    const DIV_ROW = document.getElementById('row-players');

    players.forEach(player => {
        const DIV_PLAYER_ROW = document.createElement('div');
        const DIV_ROLE = document.createElement('div');
        const P_NAME = document.createElement('p');
        P_NAME.textContent = player.name;
        P_NAME.classList.add('player-name-row');


        DIV_PLAYER_ROW.appendChild(DIV_ROLE);
        DIV_PLAYER_ROW.appendChild(P_NAME);
        DIV_PLAYER_ROW.classList.add('div-player-row');

        DIV_ROW.appendChild(DIV_PLAYER_ROW);


        if (player.role === "Wolf") {
            DIV_ROLE.classList.toggle("wolf-image-input");
        } else if (player.role === "Seer") {
            DIV_ROLE.classList.toggle("seer-image-input");
        } else {
            DIV_ROLE.classList.toggle("villager-image-input");
        }
    });


    // ==============================================
    //  Lists Villager alive and Wolves alive
    // ==============================================

    // Counters
    const H2_VILL_ALIVE = document.getElementById('villagers-alive');
    const H2_WOLF_ALIVE = document.getElementById('werewolves-alive');

    const villagersNumber = players.filter(player => player.role === "Villager" || player.role === "Seer").length;

    const villagersAliveNumber = players.filter(player =>
        (player.role === "Villager" || player.role === "Seer") && player.alive
    ).length;

    H2_VILL_ALIVE.textContent = villagersAliveNumber + " / " + villagersNumber + " alive";

    const wolvesNumber = players.filter(player => player.role === "Wolf").length;
    const wolvesAliveNumber = players.filter(player => player.role === "Wolf" && player.alive === true).length;

    H2_WOLF_ALIVE.textContent = wolvesAliveNumber + " / " + wolvesNumber + " alive";


    //List 

    const villagersAlive = players.filter(player =>
        (player.role === "Villager" || player.role === "Seer") && player.alive)

    console.log("Villagers alive:", villagersAlive);

    const wolvesAlive = players.filter(player => player.role === "Wolf" && player.alive === true);
    console.log("Wolves alive:", wolvesAlive);

    const DIV_VILL_ALIVE = document.getElementById('villagers-list');
    const DIV_WOLF_ALIVE = document.getElementById('werewolves-list');


    villagersAlive.forEach((villager, index) => {
        const DIV_PLAYER_LIST = document.createElement('div');
        const P_ROLE_LIST = document.createElement('p');
        const P_NAME_LIST = document.createElement('p');
        P_NAME_LIST.textContent = villager.name;
        P_ROLE_LIST.textContent = villager.role;
        P_ROLE_LIST.classList.add('roles-list');

        DIV_PLAYER_LIST.appendChild(P_NAME_LIST);
        DIV_PLAYER_LIST.appendChild(P_ROLE_LIST);

        // Añadir línea solo si NO es el último
        if (index < villagersAlive.length - 1) {
            const DIV_LINE = document.createElement('div');
            DIV_LINE.classList.add('line');
            DIV_PLAYER_LIST.appendChild(DIV_LINE);
        }

        DIV_PLAYER_LIST.classList.add('div-player-list');
        DIV_VILL_ALIVE.appendChild(DIV_PLAYER_LIST);
    });

    wolvesAlive.forEach((wolf, index) => {
        const DIV_PLAYER_LIST_W = document.createElement('div');
        const P_ROLE_LIST_W = document.createElement('p');
        const P_NAME_LIST_W = document.createElement('p');
        P_NAME_LIST_W.textContent = wolf.name;
        P_ROLE_LIST_W.textContent = wolf.role;
        P_ROLE_LIST_W.classList.add('roles-list');

        DIV_PLAYER_LIST_W.appendChild(P_NAME_LIST_W);
        DIV_PLAYER_LIST_W.appendChild(P_ROLE_LIST_W);

        if (index < wolvesAlive.length - 1) {
            const DIV_LINE_W = document.createElement('div');
            DIV_LINE_W.classList.add('line');
            DIV_PLAYER_LIST_W.appendChild(DIV_LINE_W);
        }

        DIV_PLAYER_LIST_W.classList.add('div-player-list');
        DIV_WOLF_ALIVE.appendChild(DIV_PLAYER_LIST_W);
    });




    // ==============================================
    //  SECTION KILL A PLAYER AND NEXT BUTTON
    // ==============================================


    // KILL A PLAYER
    const INPUT_KILLED = document.getElementById('player-killed');
    //  const P_ERROR = document.getElementById('error');
    const P_ERROR = document.createElement('p');
    const DIV_INPUT = document.getElementById('div-input-error');
    DIV_INPUT.appendChild(P_ERROR);


    const BTN_NEXT_KILLED = document.getElementById('next-killed-player');

    BTN_NEXT_KILLED.addEventListener('click', () => {

        let playerKilled = INPUT_KILLED.value.trim();
        playerKilled = playerKilled.charAt(0).toUpperCase() + playerKilled.slice(1).toLowerCase(); //First letter uppercase the rest lowercase


        P_ERROR.textContent = "";

        if (playerKilled === "") {
            P_ERROR.textContent = "Please fill in the name of the player you want to mark as killed.";
        } else {
            let found = false; // We start assuming we dont find any player


            players.forEach(player => {
                if (player.name === playerKilled) {
                    player.alive = false;
                    found = true; // If we find the player, we change found to true
                    //!si usas forEach y pones el else dentro de él, cada jugador que no coincide va a sobreescribir el mensaje de error.
                    const seer = players.find(p => p.role === "Seer");

                    // if (seer.alive === true) {
                    //    window.location.href = "12_seer.html";
                    // } else {
                    //    window.location.href = "13_everyone_opens_eyes.html";
                    //  }


                    const villagersAlive = players.filter(player =>
                        (player.role === "Villager" || player.role === "Seer") && player.alive)

                    const wolvesAlive = players.filter(player => player.role === "Wolf" && player.alive === true);

                    if (wolvesAlive.length === 0) {
                        window.location.href = "19_villagers_win.html";
                    } else if (villagersAlive.length === wolvesAlive.length) {
                        window.location.href = "20_wolves_win.html";
                    } else {

                        if (seer.alive === true) {
                            window.location.href = "12_seer.html";
                        } else {
                            window.location.href = "13_everyone_opens_eyes.html";
                        }
                    }



                }
            });
            //! No puedes tener un else después de un forEach.
            if (!found) { // If we dont find any player
                P_ERROR.textContent = "That player does not exist. Please, verify if there is any typo.";
            }
            // Si hiciese otro forEach (player.name !== playerKilled), va a recorrer todos los jugadores y va a sobreescribir el P_ERROR, aunque en el primer forEach se haya encontrado el jugador
            // Incluso si uno de los jugadores sí coincide, el siguiente que no coincida pondrá el mensaje de error. Resultado: siempre verás el mensaje de error si hay más de un jugador y alguno no coincide,
        }

        console.log("Players after killing:", players);


        localStorage.setItem('playersData', JSON.stringify(players));

    });

});

