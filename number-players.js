

const INPUT_NMB_PLAYERS = document.getElementById('nmb-players');
const BTN_NEXT_NMB = document.getElementById('next-nmb');
const P_ERROR = document.getElementById('error');


function addNumberPlayers() {
    //!Vaciar el input si voy hacia atras!
    const newNumber = INPUT_NMB_PLAYERS.valueAsNumber;
    P_ERROR.textContent = '';

    if (!isNaN(newNumber)) {         //If the input is empty, valueAsNumber returns NaN. Therefore, the condition newNumber !== '' is unnecessary and can be removed.

        // Comprobar si está en el rango 5–12
        if (newNumber >= 5 && newNumber <= 12) {

            console.log(newNumber);

            // Save the number to use it on the next page
            localStorage.setItem("totalPlayers", newNumber);


            // Go to the next HTML page
            window.location.href = "3_info-players.html";
          

        } else {
            P_ERROR.textContent = 'You have to choose a number between 5 and 12!';
        }

    } else {
        P_ERROR.textContent = 'Invalid format';
    }
}

BTN_NEXT_NMB.addEventListener('click', addNumberPlayers)
INPUT_NMB_PLAYERS.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addNumberPlayers();
    }
})

