document.addEventListener('DOMContentLoaded', () => {
    const newNumber = Number(localStorage.getItem('totalPlayers'));
    console.log("Number of players:", newNumber);

    const players = [];
    const DIV_PLAYERS = document.getElementById('container-players');



    // ==============================================
    //  Create player objects
    // ==============================================
    for (let i = 0; i < newNumber; i++) {
        players.push({ name: '', role: undefined, alive: true, image: undefined });


        // ==============================================
        //  Create text inputs 
        // ==============================================

        const INPUT_TEXT = document.createElement('input');
        INPUT_TEXT.type = 'text';
        INPUT_TEXT.placeholder = `Player ${i + 1} Name`;
        INPUT_TEXT.id = "playername-" + i;

        INPUT_TEXT.classList.add('name-input');


        // ==============================================
        //  Create image inputs 
        // ==============================================

        // Hidden real file input
        const INPUT_IMG = document.createElement('input');
        INPUT_IMG.type = 'file';
        INPUT_IMG.accept = 'image/*';
        INPUT_IMG.id = "playerpicture-" + i;
        INPUT_IMG.classList.add('hidden-file-input');

        // Visible rectangle (your .image-input styles)
        const DIV_PLAYER_EACH = document.createElement('div');
        DIV_PLAYER_EACH.classList.add('div-each-player');
        DIV_PLAYERS.appendChild(DIV_PLAYER_EACH);

        const IMG_BOX = document.createElement('div');
        IMG_BOX.classList.add('image-input');

        // Clicking the box triggers file input
        IMG_BOX.addEventListener('click', () => {
            INPUT_IMG.click();
        });

        // Show preview
        INPUT_IMG.addEventListener('change', () => {
            const file = INPUT_IMG.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                IMG_BOX.style.backgroundImage = `url(${reader.result})`;
                IMG_BOX.style.backgroundSize = 'cover';
                IMG_BOX.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        });

        // ==============================================
        //  Append both inputs 
        // ==============================================

        DIV_PLAYER_EACH.appendChild(IMG_BOX);
        DIV_PLAYER_EACH.appendChild(INPUT_IMG);
        DIV_PLAYER_EACH.appendChild(INPUT_TEXT);

        console.log(players);
    }


    // ==============================================
    //  BUTTON NEXT - SAVE 
    // ==============================================

    const BTN_NEXT_SAVE = document.getElementById('next-save-players');
    const P_ERROR = document.getElementById('error');



    BTN_NEXT_SAVE.addEventListener('click', () => {
        let hasError = false; // ! Necessary: It allows going to the next screen OUT of the forEach
        const inputs_text = DIV_PLAYERS.querySelectorAll('input[type=text]');
        P_ERROR.textContent = "";

        // If name empty, name duplicated (inside forEach)

        // 1 - Primero actualizar todos los nombres - MEJOR HACER 2 FOR EACH SEPARADOS!
        inputs_text.forEach(input => {
            const i = +input.id.split("-")[1];
            players[i].name = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1).toLowerCase();
        });

        // 2 - Luego validar
        inputs_text.forEach(input => {
            const i = +input.id.split("-")[1];

            const duplicateFunction = players.filter(player => player.name === players[i].name).length > 1;

            if (players[i].name === "") {
                hasError = true;
                P_ERROR.textContent = 'Please enter the names of all the players';

            } else if (duplicateFunction) {
                hasError = true;
                P_ERROR.textContent = 'Please choose different names for every player';
            }
        });


        // Otherwise 
        if (!hasError) { // ! OUT of the forEach. otherwise the forEach goes one by one, and the moment there's a filled non-duplicated name it goes to the next screen
            localStorage.setItem('playersData', JSON.stringify(players));
            console.log("Players array after saving:", players);
            window.location.href = "4_roles-players.html";


        }
    });

});




