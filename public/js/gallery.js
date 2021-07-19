const uploadingImages = document.getElementById('uploading__images');
const uploadingImageForm = document.getElementById('uploadingImage__form')
const deleteGalleryForm = document.getElementById('deleteGallery__form');
const deleteGalleryNameInput = document.getElementById('checkGallery__name');
const deleteGalleryButton = document.getElementById('deleteGallery__submit');
const uploadingImageLabel = document.getElementById('uploadingImage__label')
const ImageContainer = document.getElementById('image__container')

const createImage = url =>
new Promise((resolve, reject) => {
  const image = new Image()
  image.addEventListener('load', () => resolve(image))
  image.addEventListener('error', error => reject(error))
  image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
  image.src = url
})

const onFileInputChange = async(e) => {
  const uploadingImageLabel = document.getElementById('uploadingImage__label')
  const ImageContainer = document.getElementById('image__container')
  const container = document.getElementById('container')
  Array.from(e.target.files).forEach(async file => {
    let imageUrl = URL.createObjectURL(file);
    const preview = await createImage(imageUrl);
    const previewDiv = document.createElement('figure');
    uploadingImageLabel.classList.add('hidden')
    ImageContainer.classList.remove('hidden');
    previewDiv.classList.add('item');
    previewDiv.appendChild(preview);
    container.appendChild(previewDiv);
  })
}

deleteGalleryForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const container = document.getElementById('container')
  let galleryName = deleteGalleryNameInput.value;
  let Url = `${window.location.origin}/admin/Check-For_gallery?name=${galleryName}`;
  const gallery = await fetch(Url);
  if (gallery.status === 200) {
    const {imagesLink} = await gallery.json();
    imagesLink.forEach(image => {
      let img = new Image();
      img.src = `${image}`;
      const previewDiv = document.createElement('figure');
      previewDiv.classList.add('item');
      previewDiv.appendChild(img);
      container.appendChild(previewDiv);
    });
  }
})

deleteGalleryNameInput?.addEventListener('change', () => {
  container.textContent = '';
})

deleteGalleryButton?.addEventListener('click', async () => {
  let galleryName = deleteGalleryNameInput.value;
  if (galleryName && container.hasChildNodes()) {
    let Url = `${window.location.origin}/admin/Deleting-Gallery?name=${galleryName}`;
    let status = await fetch(Url);
    let {ok} = await status.json();
    if (ok) window.location.replace(window.location.origin)
  } else {
    deleteGalleryNameInput.focus();
  }
})

uploadingImages?.addEventListener('change', onFileInputChange)


