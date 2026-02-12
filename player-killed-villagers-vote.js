document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);



    // ==============================================
    //  SECTION ROW PLAYERS 
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
    //  SECTION VILLAGERS AND WOLVES
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




    // ==============================================
    //  Lists Villager alive and Wolves alive
    // ==============================================

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
    //  DROP DOWN TO VOTE
    // ==============================================

    const DIV_DROPDOWN = document.getElementById('div-list-dropdown');
    const playersAlive = players.filter(player => player.alive);

    
    playersAlive.forEach((player, i) => { //Aqui es player 

        //! 1. forEach joueur, créer un label avec son nom et un select

        // Crear label
        const L_NAME = document.createElement('label');
        L_NAME.textContent = player.name;
        L_NAME.setAttribute('for', `vote-${i}`);

        // Crear select
        const SEL_VOTE = document.createElement('select');
        SEL_VOTE.setAttribute('name', 'vote');
        SEL_VOTE.setAttribute('id', `vote-${i}`);

        // Select: Opción por defecto
        const OPT_DEFAULT = document.createElement('option');
        OPT_DEFAULT.textContent = 'Choose a player';
        OPT_DEFAULT.value = "";
        OPT_DEFAULT.hidden = true;
        OPT_DEFAULT.selected = true;
        SEL_VOTE.appendChild(OPT_DEFAULT);

     //! 2. ForEach select, il devient un joueur (mais pas le joueur du label)
        // Select: Opciones para votar (todos los jugadores vivos excepto él mismo)
        playersAlive.forEach((p, j) => { //Aqui es p, no pueden tener el mismo nombre. Uso j en vez de i (index) porque tienen que ser diferentes 
            if (j !== i) { // No votarse a sí mismo (candidate.index !== voter.index)
                const OPT_PLAYER = document.createElement('option');
                OPT_PLAYER.value = j;
                OPT_PLAYER.textContent = p.name;
                SEL_VOTE.appendChild(OPT_PLAYER);
            }
        });

        // Contenedor
        const DIV_EACH_DROPDOWN = document.createElement('div');
        DIV_EACH_DROPDOWN.appendChild(L_NAME);
        DIV_EACH_DROPDOWN.appendChild(SEL_VOTE);
        DIV_EACH_DROPDOWN.classList.add('each-dropdown');

        DIV_DROPDOWN.appendChild(DIV_EACH_DROPDOWN);
    });




    // ==============================================
    //  COUNT VOTES, THE MOST VOTED
    // ==============================================


    const P_ERROR = document.createElement('p');
    const DIV_INPUT = document.getElementById('div-input-error'); // div donde mostrar errores
    DIV_INPUT.appendChild(P_ERROR);

    const BTN_NEXT_KILLED = document.getElementById('next-killed-player');

    BTN_NEXT_KILLED.addEventListener('click', () => {

        P_ERROR.textContent = ""; // Reset error

        // !3. votes - Array pour enregistrer les votes + push

        const votes = [];
        let errorFound = false;

        playersAlive.forEach((player, i) => {
            const selectedVote = document.getElementById(`vote-${i}`);
            const selectedVoteValue = selectedVote.value;

            if (selectedVoteValue === "") { // Si no se ha seleccionado
                P_ERROR.textContent = `Please choose a vote for every player`;
                errorFound = true;
                return; // Salimos del forEach actual
            } else {
                votes.push(Number(selectedVoteValue)); // Number: de "0" → 0, de "1" → 1 Guardamos el índice del jugador votado 
            }


        });

        console.log("Votes:", votes);

        if (errorFound) return;

          // !4. voteCount - Objet pour enregistrer chaque jouer et le nombre de votes obtenu

        const voteCount = {};
        votes.forEach(votedPlayer => {  //votedPlayer → jugador que recibió el voto
            if (!voteCount[votedPlayer]) voteCount[votedPlayer] = 0; // si aún no existe una entrada para ese jugador, la inicializamos en 0
            voteCount[votedPlayer]++; // sumamos 1 al contador de ese jugador
        });

        console.log("Vote count:", voteCount);

         // !5. .sort - Function pour trier le jouers par ordre décroissant 
        const sortedVotes = Object.entries(voteCount).sort((a, b) => b[1] - a[1]); //Lo convierte en una lista de parejas para aplicar el sort

        if (sortedVotes.length < 2) {
            P_ERROR.textContent = "Not enough votes to determine the top two players.";
            return;
        }

        // !6. sortedVotes[0][0]- Le deux plus votés  
        const firstIndex = Number(sortedVotes[0][0]); //Primer 0 es el index, que empieza por 0 como siempre, y si el segndo si es 0 aplica el numero de jugador, si es 1 es el numero de votos
        const secondIndex = Number(sortedVotes[1][0]);

        console.log("Top two voted indexes:", firstIndex, secondIndex);

        const firstPlayer = playersAlive[firstIndex]; 
        const secondPlayer = playersAlive[secondIndex];

        console.log("Top two voted:", firstPlayer.name, secondPlayer.name);

        localStorage.setItem("playersData", JSON.stringify(players));
        localStorage.setItem("firstMostVoted", JSON.stringify(firstPlayer.name));
        localStorage.setItem("secondMostVoted", JSON.stringify(secondPlayer.name));

      window.location.href = "16_player-killed-villagers-finalvote.html";
    });



});

