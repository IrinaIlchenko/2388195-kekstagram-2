import {isEscapeKey} from './util.js';
import {renderThumbnail, clearThumbnail} from './render-thumbnails.js';
import {clearComments, renderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  clearComments();

  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.body.classList.remove('modal-open');
}

const openBigPicture = (currentPictureId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(currentPictureId));
  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  document.body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
};

const renderBigPicture = (data) => {
  clearThumbnail();
  renderThumbnail(data);
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((item) =>
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(item.dataset.id, data);
    })
  );
};

export {renderBigPicture};
