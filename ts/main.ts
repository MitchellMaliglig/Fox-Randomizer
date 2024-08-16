interface FormElements extends HTMLFormControlsCollection {
  title: HTMLTextAreaElement;
  notes: HTMLTextAreaElement;
  // title: ['save-title'];
  // notes: ['save-notes'];
}

const defaultImage = 'images/placeholder.jpg';

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

const $saveEditAnchor = document.querySelector(
  'a.save-edit',
) as HTMLAnchorElement;
if (!$saveEditAnchor) throw new Error('$saveEditAnchor missing');

const $saveDialog = document.querySelector(
  'dialog.save-dialog',
) as HTMLDialogElement;
if (!$saveDialog) throw new Error('$saveDialog missing');

const $saveForm = document.querySelector('form.save-form') as HTMLFormElement;
if (!$saveForm) throw new Error('$saveForm missing');

const $generateFoxDiv = document.querySelector(
  'div[data-view="generate-fox"]',
) as HTMLDivElement;
if (!$generateFoxDiv) throw new Error('$generateFoxDiv missing');

const $viewFoxDiv = document.querySelector(
  'div[data-view="view-fox"]',
) as HTMLDivElement;
if (!$viewFoxDiv) throw new Error('$viewFoxDiv missing');

const $editFoxDiv = document.querySelector(
  'div[data-view="edit-fox"',
) as HTMLDivElement;
if (!$editFoxDiv) throw new Error('$editFoxDiv missing');

const $ul = document.querySelector('ul') as HTMLUListElement;
if (!$ul) throw new Error('$ul missing');

const $noFoxesImage = document.querySelector(
  'img.no-foxes',
) as HTMLImageElement;
if (!$noFoxesImage) throw new Error('$noFoxesImages missing');

const $saveRequiredText = document.querySelector(
  'p#save-required-text',
) as HTMLParagraphElement;
if (!$saveRequiredText) throw new Error('$saveRequiredText missing');

const $saveRequiredImage = document.querySelector(
  'p#save-required-image',
) as HTMLParagraphElement;
if (!$saveRequiredImage) throw new Error('$saveRequiredImage missing');

const $editImage = document.querySelector('img.edit') as HTMLImageElement;
if (!$editImage) throw new Error('$editImage missing');

const $editTitle = document.querySelector(
  'textarea#edit-title',
) as HTMLTextAreaElement;
if (!$editTitle) throw new Error('$editTitle missing');

const $editNotes = document.querySelector(
  'textarea#edit-notes',
) as HTMLTextAreaElement;
if (!$editNotes) throw new Error('$editNotes missing');

const $editForm = document.querySelector('form.edit-form') as HTMLFormElement;
if (!$editForm) throw new Error('$editForm missing');

const $editRequired = document.querySelector(
  '#edit-required-text',
) as HTMLParagraphElement;
if (!$editRequired) throw new Error('$editRequired missing');

const dataViews = {
  map: new Map(
    Object.entries({
      'generate-fox': $generateFoxDiv,
      'view-fox': $viewFoxDiv,
      'edit-fox': $editFoxDiv,
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
  data.editingId = -1;
}

function resetDefaultImage(): void {
  $randomImage.src = defaultImage;
}

function renderFox(fox: FoxData): HTMLLIElement {
  const $li = document.createElement('li');
  $li.setAttribute('data-fox-id', fox.id.toString());

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $imageHalf = document.createElement('div');
  $imageHalf.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.src = fox.photo;

  const $textHalf = document.createElement('div');
  $textHalf.setAttribute('class', 'column-half');

  const $h3 = document.createElement('h3');
  $h3.textContent = fox.title;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');

  const $p = document.createElement('p');
  $p.textContent = fox.notes;

  $li.append($row);
  $imageHalf.append($img);
  $h3.append($pencilIcon);
  $textHalf.append($h3, $p);
  $row.append($imageHalf, $textHalf);
  return $li;
}

function toggleNoFoxes(): void {
  if (data.foxes.length > 0) {
    $noFoxesImage.className = 'no-foxes hidden';
  } else {
    $noFoxesImage.className = 'no-foxes show';
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
  $saveRequiredText.className = 'hidden';
  $saveRequiredImage.className = 'hidden';
  $saveForm.reset();
  $saveDialog.close();
});

$saveYesAnchor.addEventListener('click', function () {
  const $formElements = $saveForm.elements as FormElements;

  if ($randomImage.src.includes(defaultImage)) {
    $saveRequiredImage.className = 'show';
  } else if (!$formElements.title.value || !$formElements.notes.value) {
    $saveRequiredText.className = 'show';
  } else {
    const foxData: FoxData = {
      title: $formElements.title.value,
      notes: $formElements.notes.value,
      photo: $randomImage.src,
      id: data.nextId,
    };

    data.nextId++;
    data.foxes.unshift(foxData);

    toggleNoFoxes();
    resetDefaultImage();
    $message.textContent = getSaved();
    $saveRequiredText.className = 'hidden';
    $saveRequiredImage.className = 'hidden';

    $ul.prepend(renderFox(foxData));
    writeData();

    $saveForm.reset();
    $saveDialog.close();
  }
});

$foxesAnchor.addEventListener('click', function () {
  swapViews('view-fox');
});

$newAnchor.addEventListener('click', function () {
  swapViews('generate-fox');
});

document.addEventListener('DOMContentLoaded', function () {
  data.foxes.forEach(function (fox) {
    $ul.append(renderFox(fox));
  });

  toggleNoFoxes();
});

$ul.addEventListener('click', function (event: Event) {
  const $eventTarget = event.target as HTMLElement;
  $editRequired.className = 'hidden';

  if ($eventTarget.tagName === 'I') {
    swapViews('edit-fox');

    const $li = $eventTarget.closest('li') as HTMLLIElement;
    data.editingId = Number($li.getAttribute('data-fox-id'));
    const fox = getFox(data.editingId) as FoxData;

    $editImage.src = fox.photo;
    $editTitle.value = fox.title;
    $editNotes.value = fox.notes;
  }
});

$saveEditAnchor.addEventListener('click', function () {
  if (!$editTitle.value || !$editNotes.value) {
    $editRequired.className = 'show';
  } else {
    const fox = {
      title: $editTitle.value,
      notes: $editNotes.value,
      photo: $editImage.src,
      id: data.editingId,
    } as FoxData;
    replaceFox(fox);

    const $li = document.querySelector(
      `li[data-fox-id="${data.editingId}"]`,
    ) as HTMLLIElement;

    $ul.insertBefore(renderFox(fox), $li);
    $li.remove();

    $editForm.reset();
    writeData();
    swapViews('view-fox');
  }
});
