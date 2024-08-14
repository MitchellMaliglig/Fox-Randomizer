const $randomImage = document.querySelector('img.random') as HTMLImageElement;
if (!$randomImage) throw new Error('$randomImage missing');

const $generateAnchor = document.querySelector(
  'a.generate',
) as HTMLAnchorElement;
if (!$generateAnchor) throw new Error('$generateAnchor missing');

const $saveAnchor = document.querySelector('a.save') as HTMLAnchorElement;
if (!$saveAnchor) throw new Error('$saveAnchor missing');

const $message = document.querySelector('p.message') as HTMLParagraphElement;
if (!$message) throw new Error('$message missing');

const $saveNopeAnchor = document.querySelector(
  'a.save-nope',
) as HTMLAnchorElement;
if (!$saveNopeAnchor) throw new Error('$saveNopeAnchor missing');

const $saveYesAnchor = document.querySelector(
  'a.save-yes',
) as HTMLAnchorElement;
if (!$saveYesAnchor) throw new Error('$saveYesAnchor');

const $saveDialog = document.querySelector(
  'dialog.save-dialog',
) as HTMLDialogElement;
if (!$saveDialog) throw new Error('$saveDialog missing');

const $saveForm = document.querySelector('form.save-form') as HTMLFormElement;
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
