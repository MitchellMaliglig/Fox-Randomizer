const $randomImage = document.querySelector('img.random') as HTMLImageElement;
if (!$randomImage) throw new Error('$randomImage missing');

const $generateAnchor = document.querySelector(
  'a.generate',
) as HTMLAnchorElement;
if (!$generateAnchor) throw new Error('$generateAnchor missing');

const $message = document.querySelector('p.message') as HTMLParagraphElement;
if (!$message) throw new Error('$message missing');

$generateAnchor.addEventListener('click', async function () {
  const img = await fetchFox();

  if (img != null) {
    $randomImage.src = img;
    $message.textContent = getMessage();
  }
});
