# Cvičení: Chat

## Zadání

1. Prohlédni si soubor `index.html`. Stránka je nastylovaná pomocí [Bootstrapu](https://getbootstrap.com/). Nejsou potřeba žádné další CSS. Všimni si formulářových inputů `#name-input` a `#message-input`, elementu `#messages`, se kterými budeš později pracovat. Pro splnění zadání stačí upravovat pouze soubor `index.js`.
1. Uprav soubor `index.js` tak, aby stránka zobrazovala nejnovější zprávy z api.

   1. Doplň tělo funkce `Message`. Jejím úkolem bude vracet řetězec HTML jedné zprávy podle předlohy, kterou najdeš v `index.html`. Správné chování můžeš vyzkoušet například výpisem do konzole pomocí `console.log(Message({name: 'Pavel', message: 'Ahoj 👋', date: '11. 5. 2020 17:30:00'}))`.
   1. Dopiš funkci `MessageList`. Pomocí `for` smyčky zavolej pro každou zprávu `Message(props.items[i])`. Všechny řetězce spoj v jeden a vrať.
   1. Vyzkoušej, že volání `show(testMessages)` přidá zkušební zprávy do stránky.
   1. Pomocí zabudované funkce `fetch` stáhni uvnitř `fetchMessagesAndShow` zprávy z api. Ukázkový kód najdeš v [dokumentaci](https://czechichat.herokuapp.com/documentation/) v části `Get recent messages`. Zprávy přes `show(data.messages)` zobraz na stránce. Měly by se ti ukázat minimálně dvě.
   1. Smaž z html ukázkovou šablonu zprávy, ať při načtení stránky neproblikává.

1. Uprav soubor `index.js` tak, aby formulář pomocí api odesílal nové zprávy na server.
   1. Doplň funkci `onSubmit`, která při uložení formuláře odešle jméno a text z inputů. Vycházej ze sekce `Send message` v [dokumentaci](https://czechichat.herokuapp.com/documentation/).
   1. Pozdrav ostatní v chatu. Vyplň na stránce políčko pro tvé jméno a zprávu textem „Ahoj“. Odešli.

## Bonus

1. Vymaž políčko na zadávání textu zprávy po jeho odeslání.
1. Zabraň dvojímu odeslání formuláře, pokud uživatel omylem dvakrát za sebou rychle klikne na `Odeslat`.
1. Přidej do stránky CSS, které problikne žlutě všemi zprávami při každém renderu. Vyžaduje úpravu `index.html`.
   ```css
   <style>
       @keyframes new-message {
           0% {
               background-color: #ffffd3;
           }
       }
       .card {
           animation: new-message 1s;
       }
   </style>
   ```
1. Při přijímání zpráv sleduj hodnotu `lastUpdate`, kterou posílá server společně s `messages`. Volej funci `show` jen při změně `lastUpdate`. Server mění tuto hodnotu pouze při přijetí nové zprávy.
1. Zobrazování vstupu od uživatele pomocí `.innerHTML` představuje bezpečnostní díru. Zamysli se, jakou zprávou by mohl uživatel tvou stránku rozbít.
