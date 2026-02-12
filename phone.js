
const DIV_SEC_VILL = document.getElementById("section-villagers");
const DIV_HEADER_VILL = document.getElementById("header-villagers");

const DIV_SEC_WOLF = document.getElementById("section-wolves");
const DIV_HEADER_WOLF = document.getElementById("header-wolves");

//ARROWS 
//Arrow down 

const ARROW_DOWN = document.createElement('img');
ARROW_DOWN.classList.add('arrow-visible');
DIV_HEADER_VILL.appendChild(ARROW_DOWN);
ARROW_DOWN.src = "./elements/icons/arr-down.svg";


//Arrow up
const ARROW_UP = document.createElement('img');
ARROW_UP.classList.add('arrow-hidden');
DIV_HEADER_VILL.appendChild(ARROW_UP);
ARROW_UP.src = "./elements/icons/arr-up.svg";

//Arrow down 2

const ARROW_DOWN_2 = document.createElement('img');
ARROW_DOWN_2.classList.add('arrow-visible');

DIV_HEADER_WOLF.appendChild(ARROW_DOWN_2);
ARROW_DOWN_2.src = "./elements/icons/arr-down.svg";


//Arrow up 2
const ARROW_UP_2 = document.createElement('img');
ARROW_UP_2.classList.add('arrow-hidden');

DIV_HEADER_WOLF.appendChild(ARROW_UP_2);
ARROW_UP_2.src = "./elements/icons/arr-up.svg";

//--------- ARROWS DISABLED IN DESKTOP VERSION on css



DIV_HEADER_VILL.addEventListener("click", () => {
    DIV_SEC_VILL.classList.toggle("section-villagers-open");

    ARROW_DOWN.classList.toggle("arrow-hidden");
    ARROW_DOWN.classList.toggle("arrow-visible");

    ARROW_UP.classList.toggle("arrow-hidden");
    ARROW_UP.classList.toggle("arrow-visible");
});



DIV_HEADER_WOLF.addEventListener("click", () => {
    DIV_SEC_WOLF.classList.toggle("section-wolves-open");

    ARROW_DOWN_2.classList.toggle("arrow-hidden");
    ARROW_DOWN_2.classList.toggle("arrow-visible");

    ARROW_UP_2.classList.toggle("arrow-hidden");
    ARROW_UP_2.classList.toggle("arrow-visible");
});


