'use strict';

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */

const messagesElement = document.querySelector('#messages');

/*onst testMessages = [
  { name: 'Pavel', message: 'Ahoj 👋', date: '11. 5. 2020 17:30:00' },
  {
    name: 'Martina',
    message: 'Ja se máte?',
    date: '11. 5. 2020 17:29:54',
  },
  { name: 'Michal', message: 'Nazdar', date: '12. 5. 2020 12:17:21' },
  { name: 'Ivana', message: 'Ahoj', date: '12. 5. 2020 11:02:15' },
];*/

const Message = (props) => {
  // komponenta vracející řetězec v podobě HTML zprávy
  return `
  <div class="card mt-3 mb-3">
    <div class="card-body">
      <h5 class="card-title">
        ${props.name}
        <small class="text-muted">${props.date}</small>
      </h5>
      <p class="card-text">${props.message}</p>
    </div>
  </div>`;
};

const MessageList = (props) => {
  // komponenta vracející jeden řetězec obsahující více zpráv
  let messagesData = '';
  for (let i = 0; i < props.items.length; i++) {
    messagesData += Message(props.items[i]);
  }
  return messagesData;
};

// Zobrazí zprávy, messages na stránce
const show = (messages) => {
  messagesElement.innerHTML = MessageList({
    items: messages,
  });
};

const fetchMessagesAndShow = () => {
  // funkce stahující zprávy ze serveru a přidávající je na stránku pomocí funkce show
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then((response) => response.json())
    .then((data) => show(data.messages));
};

setInterval(fetchMessagesAndShow, 2000); // Každé dvě sekundy zavolá updateMessages
fetchMessagesAndShow(); // Stáhne a zobrazí nové zprávy hned po načtení stránky

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');
const buttonElement = document.querySelector('#submit-button');

const onSubmit = (event) => {
  event.preventDefault(); // Zamezí přesměrování na jinou stránku při odesílání formuláře

  const data = JSON.stringify({
    name: nameInputElement.value,
    message: messageInputElement.value,
  });

  //console.log('Data:', data);
  buttonElement.disabled = true;

  // odešli data na server
  if (nameInputElement.value !== '' || messageInputElement.value !== '') {
    fetch('https://czechichat.herokuapp.com/api/send-message', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    }).then((response) => {
      console.log(response);
    });
  }
  nameInputElement.value = '';
  messageInputElement.value = '';

  buttonElement.disabled = false;
};

document.querySelector('#send-form').addEventListener('submit', onSubmit);
