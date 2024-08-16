'use strict';
const foxKey = 'fox-key';
const data = readData();
const messages = [
  'Cute!',
  'Adorable!',
  'Lovely!',
  'Oh dear, I really like this one!',
  'So very fluffy!',
  'Amazing!',
  'Great!',
  "We've got a good one right here!",
  'This one makes me happy...',
];
const saved = ['Great choice!', 'Excellent choice!', 'Good taste!'];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeData() {
  const json = JSON.stringify(data);
  localStorage.setItem(foxKey, json);
}
function readData() {
  const json = localStorage.getItem(foxKey);
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return {
      foxes: [],
      editingId: -1,
      nextId: 1,
    };
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMessage() {
  return `"${messages[Math.floor(Math.random() * messages.length)]}"`;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSaved() {
  return `"${saved[Math.floor(Math.random() * saved.length)]}"`;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchFox() {
  try {
    const response = await fetch('https://randomfox.ca/floof/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const fox = await response.json();
    return fox.image;
  } catch (error) {
    console.error('Error:', error);
  }
  return null;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFox(id) {
  for (let i = 0; i < data.foxes.length; i++) {
    if (data.foxes[i].id === id) {
      return data.foxes[i];
    }
  }
  return null;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replaceFox(fox) {
  for (let i = 0; i < data.foxes.length; i++) {
    if (fox.id === data.foxes[i].id) {
      data.foxes[i] = fox;
    }
  }
}
