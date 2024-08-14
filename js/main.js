'use strict';
const $randomImage = document.querySelector('img.random');
if (!$randomImage) throw new Error('$randomImage missing');
const $generateAnchor = document.querySelector('a.generate');
if (!$generateAnchor) throw new Error('$generateAnchor missing');
const $saveAnchor = document.querySelector('a.save');
if (!$saveAnchor) throw new Error('$saveAnchor missing');
const $message = document.querySelector('p.message');
if (!$message) throw new Error('$message missing');
const $saveNopeAnchor = document.querySelector('a.save-nope');
if (!$saveNopeAnchor) throw new Error('$saveNopeAnchor missing');
const $saveYesAnchor = document.querySelector('a.save-yes');
if (!$saveYesAnchor) throw new Error('$saveYesAnchor');
const $saveDialog = document.querySelector('dialog.save-dialog');
if (!$saveDialog) throw new Error('$saveDialog missing');
const $saveForm = document.querySelector('form.save-form');
if (!$saveForm) throw new Error('$saveForm missing');
$generateAnchor.addEventListener('click', async function () {
  const img = await fetchFox();
  if (img != null) {
    $randomImage.src = img;
    $message.textContent = getMessage();
  }
});
$saveAnchor.addEventListener('click', function () {
  $saveDialog.showModal();
});
$saveNopeAnchor.addEventListener('click', function () {
  $saveForm.reset();
  $saveDialog.close();
});
$saveYesAnchor.addEventListener('click', function () {
  $saveForm.reset();
  $saveDialog.close();
});
