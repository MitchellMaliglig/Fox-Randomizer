'use strict';
const defaultImage = 'images/placeholder.jpg';
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
const $foxesAnchor = document.querySelector('a.foxes');
if (!$foxesAnchor) throw new Error('$foxesAnchor missing');
const $newAnchor = document.querySelector('a.new');
if (!$newAnchor) throw new Error('$newAnchor missing');
const $saveDialog = document.querySelector('dialog.save-dialog');
if (!$saveDialog) throw new Error('$saveDialog missing');
const $saveForm = document.querySelector('form.save-form');
if (!$saveForm) throw new Error('$saveForm missing');
const $generateFoxDiv = document.querySelector('div[data-view="generate-fox"]');
if (!$generateFoxDiv) throw new Error('$generateFoxDiv missing');
const $viewFoxDiv = document.querySelector('div[data-view="view-fox"]');
if (!$viewFoxDiv) throw new Error('$viewFoxDiv missing');
const $editFoxDiv = document.querySelector('div[data-view="edit-fox"');
if (!$editFoxDiv) throw new Error('$editFoxDiv missing');
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul missing');
const $noFoxesImage = document.querySelector('img.no-foxes');
if (!$noFoxesImage) throw new Error('$noFoxesImages missing');
const $saveRequiredText = document.querySelector('p#save-required-text');
if (!$saveRequiredText) throw new Error('$saveRequiredText missing');
const $saveRequiredImage = document.querySelector('p#save-required-image');
if (!$saveRequiredImage) throw new Error('$saveRequiredImage missing');
const $editImage = document.querySelector('img.edit');
if (!$editImage) throw new Error('$editImage missing');
const $editTitle = document.querySelector('textarea#edit-title');
if (!$editTitle) throw new Error('$editTitle missing');
const $editNotes = document.querySelector('textarea#edit-notes');
if (!$editNotes) throw new Error('$editNotes missing');
const dataViews = {
  map: new Map(
    Object.entries({
      'generate-fox': $generateFoxDiv,
      'view-fox': $viewFoxDiv,
      'edit-fox': $editFoxDiv,
    }),
  ),
};
function swapViews(view) {
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
function resetDefaultImage() {
  $randomImage.src = defaultImage;
}
function renderFox(fox) {
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
function toggleNoFoxes() {
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
  const $formElements = $saveForm.elements;
  if ($randomImage.src.includes(defaultImage)) {
    $saveRequiredImage.className = 'show';
  } else if (!$formElements.title.value || !$formElements.notes.value) {
    $saveRequiredText.className = 'show';
  } else {
    const foxData = {
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
$ul.addEventListener('click', function (event) {
  let $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    swapViews('edit-fox');
    let $li = $eventTarget.closest('li');
    const id = Number($li.getAttribute('data-fox-id'));
    let fox = getFox(id);
    $editImage.src = fox.photo;
    $editTitle.textContent = fox.title;
    $editNotes.textContent = fox.notes;
  }
});
