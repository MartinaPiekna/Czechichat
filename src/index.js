'use strict';

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */

const messagesElement = document.querySelector('#messages');

// komponenta vracející řetězec v podobě HTML zprávy
const Message = (props) => {
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

// komponenta vracející jeden řetězec obsahující více zpráv
const MessageList = (props) => {
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

// funkce stahující zprávy ze serveru a přidávající je na stránku pomocí funkce show
const fetchMessagesAndShow = () => {
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then((response) => response.json())
    .then((data) => show(data.messages));
};

// Každé dvě sekundy zavolá updateMessages
setInterval(fetchMessagesAndShow, 2000);

// Stáhne a zobrazí nové zprávy hned po načtení stránky
fetchMessagesAndShow();

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');
const buttonElement = document.querySelector('#submit-button');

const onSubmit = (event) => {
  // Zamezí přesměrování na jinou stránku při odesílání formuláře
  event.preventDefault();

  const data = JSON.stringify({
    name: nameInputElement.value,
    message: messageInputElement.value,
  });

  //console.log('Data:', data);

  if (nameInputElement.value === '' || messageInputElement.value === '') {
    return;
  }

  // odešli data na server
  buttonElement.disabled = true;
  fetch('https://czechichat.herokuapp.com/api/send-message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: data,
  })
    .then((response) => {
      /*
    Server teoreticky mohl vrátit nějakou chybu, že zprávu neuložil. Ale v dokumentaci není napsané,jak chybu poznáme, tak budeme serveru věřit, že když odpovídá, zprávu vždy přijme.
    */
      messageInputElement.value = '';
      fetchMessagesAndShow();
    })
    .catch(() => {
      alert(
        'Je mi líto, ale server neodpovídá. Zkus zprávu odeslat za chvíli znovu.',
      );
    })
    .finally(() => {
      buttonElement.disabled = false;
    });
};

document.querySelector('#send-form').addEventListener('submit', onSubmit);
