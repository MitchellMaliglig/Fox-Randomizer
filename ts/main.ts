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

const $foxesAnchor = document.querySelector('a.foxes') as HTMLAnchorElement;
if (!$foxesAnchor) throw new Error('$foxesAnchor missing');

const $newAnchor = document.querySelector('a.new') as HTMLAnchorElement;
if (!$newAnchor) throw new Error('$newAnchor missing');

const $saveDialog = document.querySelector(
  'dialog.save-dialog',
) as HTMLDialogElement;
if (!$saveDialog) throw new Error('$saveDialog missing');

const $saveForm = document.querySelector('form.save-form') as HTMLFormElement;
if (!$saveForm) throw new Error('$saveForm missing');

const $generateFoxDiv = document.querySelector('div[data-view="generate-fox"]');
if (!$generateFoxDiv) throw new Error('$generateFoxDiv missing');

const $viewFoxDiv = document.querySelector('div[data-view="view-fox"]');
if (!$viewFoxDiv) throw new Error('$viewFoxDiv missing');

const dataViews = {
  map: new Map(
    Object.entries({
      'generate-fox': $generateFoxDiv,
      'view-fox': $viewFoxDiv,
    }),
  ) as Map<string, HTMLDivElement>,
};

function swapViews(view: string): void {
  if (dataViews.map.has(view)) {
    dataViews.map.forEach(function (v) {
      if (v.getAttribute('data-view') === view) {
        v.className = 'show';
      } else {
        v.className = 'hidden';
      }
    });
  }
}

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

$foxesAnchor.addEventListener('click', function () {
  swapViews('view-fox');
});

$newAnchor.addEventListener('click', function () {
  swapViews('generate-fox');
});
