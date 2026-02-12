document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);

    const totalPlayers = Number(localStorage.getItem('totalPlayers'));
    console.log("Number of players:", totalPlayers);

    //Show the info of the players 
    const DIV_PLAYERS_2 = document.getElementById('container-players-2');


    players.forEach(player => {
        const DIV_PLAYER_EACH = document.createElement('div');
        const REC_PLAYER = document.createElement('div');
        const P_NAME = document.createElement('p');
        P_NAME.textContent = player.name;
        P_NAME.classList.add('name-show');
        REC_PLAYER.classList.add('image-input');

        //NEW 

        
        const REC_PLAYER_BACK = document.createElement('div');
        REC_PLAYER_BACK.classList.add('image-input');
      
        
        const DIV_FLIP_CARD_OUT = document.createElement('div');
        DIV_FLIP_CARD_OUT.classList.add('div-flip-card-out');


        const DIV_FLIP_CARD = document.createElement('div');
        DIV_PLAYER_EACH.appendChild(DIV_FLIP_CARD_OUT);
        DIV_FLIP_CARD_OUT.appendChild(DIV_FLIP_CARD);
        DIV_FLIP_CARD.appendChild(REC_PLAYER);
        DIV_FLIP_CARD.appendChild(REC_PLAYER_BACK);
        DIV_FLIP_CARD.classList.add('div-flip-card');


        DIV_PLAYER_EACH.appendChild(P_NAME);
        DIV_PLAYER_EACH.classList.add('div-each-player');
        DIV_PLAYERS_2.appendChild(DIV_PLAYER_EACH);
       

        // Delay to reveal role and card
        setTimeout(() => {
            const P_ROLE = document.createElement('p');
            P_ROLE.classList.add('p-role-show');
            DIV_PLAYER_EACH.appendChild(P_ROLE);
            P_ROLE.textContent = player.role;

            DIV_FLIP_CARD.classList.add("div-flip-card-active");

            if (player.role === "Wolf") {
                REC_PLAYER.classList.toggle("wolf-image-input");
            } else if (player.role === "Seer") {
                REC_PLAYER.classList.toggle("seer-image-input");
            } else {
                REC_PLAYER.classList.toggle("villager-image-input");
            }

        }, 2000);

    });


    //Asign roles

    //5 jugadores: 1 lobo, 1 seer, 3 villagers
    //6 jugadores: 1 lobo, 1 seer, 4 villagers
    //7 jugadores: 2 lobos, 1 seer, 4 villagers
    //8 jugadores: 2 lobos, 1 seer, 5 villagers
    //9 jugadores: 2–3 lobos, 1 seer, resto villagers (lo habitual: 2 lobos)
    //10 jugadores: 2–3 lobos, 1 seer, resto villagers (3 lobos funciona bien
    //11–12 jugadores: 3 lobos, 1 seer, resto villagers

    const roles = [
        "werewolf",
        "villager",
        "seer",
    ];

    if (players.length >= 5 && players.length <= 6) {

        let randomNumberWolf = Math.floor(Math.random() * players.length);
        let randomNumberSeer;
        do {
            randomNumberSeer = Math.floor(Math.random() * players.length); //Genera un número aleatorio para el vidente (seer) y repítelo mientras sea igual al número del lobo.
            //Si son diferentes, se detiene.
        } while (randomNumberSeer === randomNumberWolf); // El do–while sirve para repetir código hasta que se cumpla una condición.



        players.forEach((player, i) => {
            if (i === randomNumberWolf) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberSeer) {
                players[i].role = "Seer";
            }

            else {
                players[i].role = "Villager";
            }
        });

    } else if (players.length >= 7 && players.length <= 9) {
        let randomNumberWolf1 = Math.floor(Math.random() * players.length);
        let randomNumberSeer;
        do {
            randomNumberSeer = Math.floor(Math.random() * players.length);

        } while (randomNumberSeer === randomNumberWolf1);
        let randomNumberWolf2;
        do {
            randomNumberWolf2 = Math.floor(Math.random() * players.length);

        } while (randomNumberWolf2 === randomNumberWolf1 || randomNumberWolf2 === randomNumberSeer);

        players.forEach((player, i) => {
            if (i === randomNumberWolf1) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberWolf2) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberSeer) {
                players[i].role = "Seer";
            }

            else {
                players[i].role = "Villager";
            }
        });

    } else {
        let randomNumberWolf1 = Math.floor(Math.random() * players.length);
        let randomNumberSeer;
        do {
            randomNumberSeer = Math.floor(Math.random() * players.length);

        } while (randomNumberSeer === randomNumberWolf1);
        let randomNumberWolf2;
        do {
            randomNumberWolf2 = Math.floor(Math.random() * players.length);

        } while (randomNumberWolf2 === randomNumberWolf1 || randomNumberWolf2 === randomNumberSeer);
        let randomNumberWolf3;
        do {
            randomNumberWolf3 = Math.floor(Math.random() * players.length);
        } while (randomNumberWolf3 === randomNumberWolf1 || randomNumberWolf3 === randomNumberSeer || randomNumberWolf3 === randomNumberWolf2);

        players.forEach((player, i) => {
            if (i === randomNumberWolf1) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberWolf2) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberWolf3) {
                players[i].role = "Wolf";
            }

            else if (i === randomNumberSeer) {
                players[i].role = "Seer";
            }

            else {
                players[i].role = "Villager";
            }
        });


    }
    console.log("Players with roles:", players);

     const BTN_NEXT_SAVE = document.getElementById('next-save-players');

    BTN_NEXT_SAVE.addEventListener('click', () => {
    
      //  window.location.href = "player-killed-wolves-1.html";
      window.location.href = "6_each-roles-players.html";
        localStorage.setItem('playersData', JSON.stringify(players));
    

    });

});


