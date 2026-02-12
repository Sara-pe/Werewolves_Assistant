document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);


const firstMostVoted = JSON.parse(localStorage.getItem("firstMostVoted"));
const secondMostVoted = JSON.parse(localStorage.getItem("secondMostVoted"));

console.log(firstMostVoted); 
console.log(secondMostVoted);




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
    //  DROP DOWN TO VOTE THE TWO FINALISTS
    // ==============================================

    

console.log(firstMostVoted); 
console.log(secondMostVoted);

const SPAN_VOTE = document.getElementById('most-voted');
SPAN_VOTE.textContent = firstMostVoted + " and " + secondMostVoted;

const DIV_DROPDOWN_FINAL = document.getElementById('div-list-dropdown-final');
const SEL_VOTE_F = document.createElement('select');
SEL_VOTE_F.setAttribute('name', 'vote-final');
SEL_VOTE_F.setAttribute('id', 'vote-final');

// Opción por defecto
const OPT_DEFAULT = document.createElement('option');
OPT_DEFAULT.textContent = 'Choose a player';
OPT_DEFAULT.value = "";
OPT_DEFAULT.hidden = true;
OPT_DEFAULT.selected = true;
SEL_VOTE_F.appendChild(OPT_DEFAULT);

// Opción firstMostVoted
const OPT_MOST_VOTED_1 = document.createElement('option');
OPT_MOST_VOTED_1.value = firstMostVoted;
OPT_MOST_VOTED_1.textContent = firstMostVoted;
SEL_VOTE_F.appendChild(OPT_MOST_VOTED_1);

// Opción secondMostVoted
const OPT_MOST_VOTED_2 = document.createElement('option');
OPT_MOST_VOTED_2.value = secondMostVoted;
OPT_MOST_VOTED_2.textContent = secondMostVoted;
SEL_VOTE_F.appendChild(OPT_MOST_VOTED_2);

// Agregar el select al contenedor
DIV_DROPDOWN_FINAL.appendChild(SEL_VOTE_F);

   // ==============================================
    //  THE SELECTED ONE IS MURDERED
    // ==============================================


const SELECT_KILLED = document.getElementById('vote-final');
const NEXT_BUTTON = document.getElementById('next-killed-player');

NEXT_BUTTON.addEventListener('click', () => {
    const playerKilled = SELECT_KILLED.value; // read value on click

    players.forEach(player => {
        if (player.name === playerKilled) {
            player.alive = false;
        }
    });
        console.log("Players after killing:", players);
        localStorage.setItem("playersData", JSON.stringify(players));

         const villagersAlive = players.filter(player =>
        (player.role === "Villager" || player.role === "Seer") && player.alive
    );

    const wolvesAlive = players.filter(player => player.role === "Wolf" && player.alive);
      
         if (wolvesAlive.length === 0) {
        window.location.href = "19_villagers_win.html"; 
    } else if (villagersAlive.length === wolvesAlive.length) {
        window.location.href = "20_wolves_win.html"; 
    } else {
        window.location.href = "17_reveal_murder_villagers.html"; 
    }

});

});

