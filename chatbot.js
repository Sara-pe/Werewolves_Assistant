// MENU OPEN-CLOSE 

const DIV_LOW = document.getElementById('chatbot-low');
const DIV_TOP = document.getElementById('chatbot-top');
const IMG_CLOSE = document.getElementById('close');
const IMG_OPEN = document.getElementById('open');
const DIV_CHATBOT = document.getElementById('chatbot');
const IMG_ROBOT = document.getElementById('robot');

const DIV_CONTAINER = document.getElementById('conversation');


IMG_CLOSE.addEventListener('click', () => {
    DIV_LOW.classList.toggle("chatbot-low-closed");
    DIV_CONTAINER.classList.toggle("conversation-closed");
    DIV_TOP.classList.toggle("chatbot-top-closed");

    IMG_CLOSE.classList.toggle("close-hidden"); 
    IMG_OPEN.classList.toggle("open-visible"); 

     DIV_CHATBOT.classList.toggle("chatbot-closed"); 
    
});

IMG_OPEN.addEventListener('click', () => {
   DIV_LOW.classList.remove("chatbot-low-closed");
    DIV_CONTAINER.classList.remove("conversation-closed");
    DIV_TOP.classList.remove("chatbot-top-closed");
    DIV_CHATBOT.classList.remove("chatbot-closed");

    // Iconos
    IMG_CLOSE.classList.remove("close-hidden"); 
    IMG_OPEN.classList.remove("open-visible"); 
    
});

//PHONE VERSION

IMG_ROBOT.addEventListener('click', () => {
   DIV_LOW.classList.remove("chatbot-low-closed");
    DIV_CONTAINER.classList.remove("conversation-closed");
    DIV_TOP.classList.remove("chatbot-top-closed");
    DIV_CHATBOT.classList.remove("chatbot-closed");

    // Iconos
    IMG_CLOSE.classList.remove("close-hidden"); 
    IMG_OPEN.classList.remove("open-visible"); 
    
});

