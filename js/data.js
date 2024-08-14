'use strict';
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
function getMessage() {
  return `"${messages[Math.floor(Math.random() * messages.length)]}"`;
}
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
/*
    19:10  error  'getMessage' is defined but never used  @typescript-eslint/no-unused-vars
    23:16  error  'fetchFox' is defined but never used    @typescript-eslint/no-unused-vars
*/
const dataFalse = false;
if (dataFalse) {
  console.log("We shouldn't be here...");
  getMessage();
  fetchFox();
}
