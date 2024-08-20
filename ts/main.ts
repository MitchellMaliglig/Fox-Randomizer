interface FormElements extends HTMLFormControlsCollection {
  title: HTMLTextAreaElement;
  notes: HTMLTextAreaElement;
}

const defaultImage = 'images/placeholder.jpg';

const $randomImage = document.querySelector('img.random') as HTMLImageElement;
if (!$randomImage) throw new Error('$randomImage missing');

const $generateAnchor = document.querySelector(
  'a#generate',
) as HTMLAnchorElement;
if (!$generateAnchor) throw new Error('$generateAnchor missing');

const $saveAnchor = document.querySelector('a#save') as HTMLAnchorElement;
if (!$saveAnchor) throw new Error('$saveAnchor missing');

const $message = document.querySelector('p.message') as HTMLParagraphElement;
if (!$message) throw new Error('$message missing');

const $saveNopeAnchor = document.querySelector(
  'a#save-nope',
) as HTMLAnchorElement;
if (!$saveNopeAnchor) throw new Error('$saveNopeAnchor missing');

const $saveYesAnchor = document.querySelector(
  'a#save-yes',
) as HTMLAnchorElement;
if (!$saveYesAnchor) throw new Error('$saveYesAnchor');

const $foxesAnchor = document.querySelector('a.foxes') as HTMLAnchorElement;
if (!$foxesAnchor) throw new Error('$foxesAnchor missing');

const $newAnchor = document.querySelector('a#new') as HTMLAnchorElement;
if (!$newAnchor) throw new Error('$newAnchor missing');

const $saveEditAnchor = document.querySelector(
  'a#save-edit',
) as HTMLAnchorElement;
if (!$saveEditAnchor) throw new Error('$saveEditAnchor missing');

const $deleteAnchor = document.querySelector(
  'a#delete-fox',
) as HTMLAnchorElement;
if (!$deleteAnchor) throw new Error('$deleteAnchor missing');

const $deleteNopeAnchor = document.querySelector(
  'a#delete-nope',
) as HTMLAnchorElement;
if (!$deleteNopeAnchor) throw new Error('$deleteNopeAnchor missing');

const $deleteYesAnchor = document.querySelector(
  'a#delete-yes',
) as HTMLAnchorElement;
if (!$deleteYesAnchor) throw new Error('$deleteYesAnchor missing');

const $saveDialog = document.querySelector(
  'dialog.save-dialog',
) as HTMLDialogElement;
if (!$saveDialog) throw new Error('$saveDialog missing');

const $deleteDialog = document.querySelector(
  'dialog.delete-dialog',
) as HTMLDialogElement;
if (!$deleteDialog) throw new Error('$deleteDialog missing');

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
  'img#no-foxes',
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

function renderFox(id: number): HTMLLIElement {
  const $li = document.createElement('li');
  $li.setAttribute('data-fox-id', id.toString());

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $imageHalf = document.createElement('div');
  $imageHalf.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.src = data.foxes.get(id)?.photo as string;

  const $textHalf = document.createElement('div');
  $textHalf.setAttribute('class', 'column-half');

  const $h3 = document.createElement('h3');
  $h3.textContent = data.foxes.get(id)?.title as string;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');

  const $p = document.createElement('p');
  $p.textContent = data.foxes.get(id)?.notes as string;

  $li.append($row);
  $imageHalf.append($img);
  $h3.append($pencilIcon);
  $textHalf.append($h3, $p);
  $row.append($imageHalf, $textHalf);
  return $li;
}

function toggleNoFoxes(): void {
  if (data.foxes.size > 0) {
    $noFoxesImage.className = 'hidden';
  } else {
    $noFoxesImage.className = 'show';
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
    };

    data.foxes.set(data.nextId, foxData);
    $ul.prepend(renderFox(data.nextId));
    data.nextId++;
    writeData();

    toggleNoFoxes();
    resetDefaultImage();
    $message.textContent = getSaved();
    $saveRequiredText.className = 'hidden';
    $saveRequiredImage.className = 'hidden';

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
  for (const id of Array.from(data.foxes.keys())) {
    $ul.prepend(renderFox(id));
  }

  toggleNoFoxes();
});

$ul.addEventListener('click', function (event: Event) {
  const $eventTarget = event.target as HTMLElement;
  const $formElements = $editForm.elements as FormElements;
  $editRequired.className = 'hidden';

  if ($eventTarget.tagName === 'I') {
    swapViews('edit-fox');

    const $li = $eventTarget.closest('li') as HTMLLIElement;
    data.editingId = Number($li.getAttribute('data-fox-id'));
    const fox = data.foxes.get(data.editingId) as FoxData;

    $editImage.src = fox.photo;
    $formElements.title.value = fox.title;
    $formElements.notes.value = fox.notes;
  }
});

$saveEditAnchor.addEventListener('click', function () {
  const $formElements = $editForm.elements as FormElements;

  if (!$formElements.title.value || !$formElements.notes.value) {
    $editRequired.className = 'show';
  } else {
    const fox = {
      title: $formElements.title.value,
      notes: $formElements.notes.value,
      photo: $editImage.src,
    } as FoxData;
    data.foxes.set(data.editingId, fox);

    const $li = document.querySelector(
      `li[data-fox-id="${data.editingId}"]`,
    ) as HTMLLIElement;

    $ul.insertBefore(renderFox(data.editingId), $li);
    $li.remove();

    $editForm.reset();
    writeData();
    swapViews('view-fox');
  }
});

$deleteAnchor.addEventListener('click', function () {
  $deleteDialog.showModal();
});

$deleteNopeAnchor.addEventListener('click', function () {
  $deleteDialog.close();
});

$deleteYesAnchor.addEventListener('click', function () {
  data.foxes.delete(data.editingId);

  const $li = document.querySelector(
    `li[data-fox-id="${data.editingId}"]`,
  ) as HTMLLIElement;
  $li.remove();

  writeData();
  toggleNoFoxes();
  swapViews('view-fox');
  $deleteDialog.close();
});
