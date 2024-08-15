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
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul missing');
const $noFoxesImage = document.querySelector('img.no-foxes');
if (!$noFoxesImage) throw new Error('$noFoxesImages missing');
const dataViews = {
  map: new Map(
    Object.entries({
      'generate-fox': $generateFoxDiv,
      'view-fox': $viewFoxDiv,
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
  $randomImage.src = 'images/placeholder.jpg';
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
  $saveForm.reset();
  $saveDialog.close();
});
$saveYesAnchor.addEventListener('click', function () {
  const $formElements = $saveForm.elements;
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
  $ul.prepend(renderFox(foxData));
  writeData();
  $saveForm.reset();
  $saveDialog.close();
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
