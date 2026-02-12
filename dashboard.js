document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);


    //? SECTION ROW PLAYERS 

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

 //? SECTION VILLAGERS AND WOLVES

// Counters
const H2_VILL_ALIVE = document.getElementById('villagers-alive');
const H2_WOLF_ALIVE = document.getElementById('werewolves-alive');

const villagersNumber = players.filter(player => player.role === "Villager"|| player.role === "Seer").length;

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

const wolvesAlive= players.filter(player => player.role === "Wolf" && player.alive === true);
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


});

