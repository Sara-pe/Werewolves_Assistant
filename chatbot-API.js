
//------------------------
// ANIMATION
//------------------------

const DIV_ANIMATION = document.createElement('div');
const P_DOTS = document.createElement('p');
const S_DOT_1 = document.createElement('span');
const S_DOT_2 = document.createElement('span');
const S_DOT_3 = document.createElement('span');

S_DOT_1.textContent = '.';
S_DOT_2.textContent = '.';
S_DOT_3.textContent = '.';

P_DOTS.appendChild(S_DOT_1);
P_DOTS.appendChild(S_DOT_2);
P_DOTS.appendChild(S_DOT_3);
DIV_ANIMATION.appendChild(P_DOTS);

DIV_ANIMATION.classList.add('hidden');
S_DOT_1.classList.add('dot');
S_DOT_2.classList.add('dot');
S_DOT_3.classList.add('dot');

S_DOT_1.classList.add('dot-1');
S_DOT_2.classList.add('dot-2');
S_DOT_3.classList.add('dot-3');


//------------------------
// API 
//------------------------

// Variables

const BTN_SEND = document.getElementById('send-chatbot');
const INPUT_MESSAGE = document.getElementById('chat-input');



// Button activation

BTN_SEND.addEventListener('click', () => {
    const message = INPUT_MESSAGE.value.trim();
    if (!message) return;

    requestChatGpt(message);
    INPUT_MESSAGE.value = '';



});


INPUT_MESSAGE.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const message = INPUT_MESSAGE.value.trim();
        if (!message) return;

        requestChatGpt(message);
        INPUT_MESSAGE.value = '';

    }

});


// Request



function requestChatGpt(message) {

    // Add user's message to chat 

    const P_USER = document.createElement('p');
    const DIV_USER = document.createElement('div');
    P_USER.textContent = message;
    DIV_USER.appendChild(P_USER);
    DIV_CONTAINER.appendChild(DIV_USER);

    //! Animation while loading
    DIV_ANIMATION.classList.remove('hidden');
    DIV_ANIMATION.classList.add('animation-waiting-div');
    DIV_CONTAINER.appendChild(DIV_ANIMATION);

    BTN_SEND.disabled = true;
    INPUT_MESSAGE.disabled = true;

    //!----

    DIV_CONTAINER.scrollTop = DIV_CONTAINER.scrollHeight;


    // Send request

    //⚠️ IMPORTANT: Version for Vercel and GitHub
    var apiKey = 'YOUR_API_KEY_HERE';

    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // ⚠️ IMPORTANT: The OpenAI key has been removed for GitHub for security reasons 
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'gpt-5-nano',
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful chatbot for a Loup-Garou game companion app.

The app itself guides the mediator through the different phases and assigns roles automatically. Your job is only to answer questions, clear doubts, and provide explanations about the rules, roles, game flow, and general advice.

The game has a fixed set of roles depending on the number of players:
- 5–6 players: 1 werewolf, 1 seer, 3 villagers
- 7–9 players: 2 werewolves, 1 seer, 4 villagers
- 10–12 players: 3 werewolves, 1 seer, the remaining players are villagers

Do not assign roles or guide the game flow unless the user specifically asks about it. The app handles all gameplay steps. You focus only on explanations and clarifications.

Only mention the roles or the number of players when the user asks directly about them. Otherwise, concentrate on giving helpful information, rules, tips, and clarifications.

Try to give concise answers in a polite manner.

Here is the sequence of a standard Loup-Garou game. This information is for reference only, so you can answer questions about the rules when the user asks:

1. The mediator (not you) chooses the number of players from 5 to 12.
2. The app assigns the roles based on the number of players.
3. The roles are revealed to each player.
4. Night phase begins and everyone closes their eyes.
5. The wolves open their eyes and choose a victim.
6. The wolves close their eyes.
7. The seer opens their eyes and points at a player. The mediator confirms or denies whether the player is a wolf.
8. The seer closes their eyes.
9. Everyone opens their eyes for the day phase.
10. The mediator announces who was killed during the night.
11. The living players vote on who to lynch. The top two players with the most votes become the suspects.
12. Everyone votes again to decide which of the two suspects is lynched.
13. Night begins again and the cycle repeats until either:
    - all werewolves are eliminated, or
    - the number of wolves equals the number of villagers.

Do not run or control these steps. The app handles all gameplay. Only explain or clarify the rules when the user asks about them.`
                    },
                    { role: 'user', content: message }
                ]
            })
        })
            .then(response => response.json())
            .then(data => {
                const reply = data.choices[0].message.content;
                const P_RESULT = document.createElement('p');
                const DIV_RESULT = document.createElement('div');

                DIV_RESULT.appendChild(P_RESULT);
                DIV_CONTAINER.appendChild(DIV_RESULT);

                P_RESULT.textContent = reply;
                console.log(reply);

                DIV_CONTAINER.scrollTop = DIV_CONTAINER.scrollHeight
            })
            .catch(error => {
                console.error("Error:", error);

                const P_ERROR = document.createElement('p');
                const DIV_ERROR = document.createElement('div');
                P_ERROR.textContent = 'Error connecting to server';
                DIV_ERROR.appendChild(P_ERROR);
                DIV_CONTAINER.appendChild(DIV_ERROR);

            })
            .finally(() => { // !Animation and activate send again
                DIV_ANIMATION.remove();
                BTN_SEND.disabled = false;
                INPUT_MESSAGE.disabled = false;
            });

    } else {
        console.log("Chatbot disabled: no token");
        const P_INFO = document.createElement('p');
        P_INFO.textContent = "Chatbot deactivated: no API token available.";
        DIV_CONTAINER.appendChild(P_INFO);
    }



}


