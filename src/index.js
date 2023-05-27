import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
select.addEventListener('change', onChangeSelect);

const divPicture = document.querySelector('.cat-info-picture');
const divInfo = document.querySelector('.cat-info-desc');
const loader = document.querySelector('.loader');

fetchAndRenderBreeds();

function fetchAndRenderBreeds() {
  loader.classList.remove('invisible');
  fetchBreeds()
    .then(cats => updateSelect(cats))
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.classList.add('invisible');
      select.classList.remove('invisible');
    });
}

function onChangeSelect(e) {
  loader.classList.remove('invisible');
  divPicture.innerHTML = '';
  divInfo.innerHTML = '';
  const breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(breed => updateCatInfo(breed))
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loader.classList.add('invisible'));
}

function updateSelect(cats) {
  const markupBreeds = cats
    .map(({ reference_image_id, name }) => {
      return `<option value =${reference_image_id}>${name}</option>`;
    })
    .join('');
  select.insertAdjacentHTML('beforeend', markupBreeds);
}

function updateCatInfo(breed) {
  const markupPicture = `<img src='${breed.url}' alt='${breed.id}' width='400'>`;
  const markupDesc = `<h1 class="cat-info-desc">${breed.breeds[0].name}</h1><p class="cat-info-desc">${breed.breeds[0].description}</p><p class="cat-info-desc"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  divPicture.insertAdjacentHTML('beforeend', markupPicture);
  divInfo.insertAdjacentHTML('beforeend', markupDesc);
}
