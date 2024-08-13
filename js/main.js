'use strict';
let $randomImage = document.querySelector('img.random');
if (!$randomImage) throw new Error('$randomImage missing');
let $generateAnchor = document.querySelector('a.generate');
if (!$generateAnchor) throw new Error('$generateAnchor missing');
let $message = document.querySelector('p.message');
if (!$message) throw new Error('$message missing');
$generateAnchor.addEventListener('click', async function () {
  let img = await fetchFox();
  if (img != null) {
    $randomImage.src = img;
    $message.textContent = getMessage();
  }
});
