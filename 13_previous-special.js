document.addEventListener('DOMContentLoaded', () => {
    const players = JSON.parse(localStorage.getItem('playersData'));
    console.log("Info players:", players);

const BTN_PREVIOUS = document.getElementById('button-if-seer');

   BTN_PREVIOUS.addEventListener('click', () => {

    const seer = players.find(p => p.role === "Seer");

    if (seer.alive === true) {
console.log ("12_seer.html")
     window.location.href = "12_seer.html";
    } else {
        console.log ("11_player-killed-wolves-1.html")
      window.location.href = "11_player-killed-wolves-1.html";
    }

  });
});
