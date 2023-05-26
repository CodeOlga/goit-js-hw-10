import { fetchBreeds } from './cat-api';

const API_KEY =
  'live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk';

const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

const select = document.querySelector('.breed-select');
select.addEventListener('change', fetchCatByBreed);

const container = document.querySelector('.cat-info');

const loader = document.querySelector('.loader');
loader.style.display = 'none';

const error = document.querySelector('.error');
error.style.display = 'none';

// let breedId = '';
//--------------------------------------------------------
function updateSelect(data) {
  fetchBreeds(data).then(dataFetched => {
    // console.log(data);
    const markupBreeds = dataFetched
      .map(({ id, name }) => {
        return `<option value =${id}>${name}</option>`;
      })
      .join('');

    select.insertAdjacentHTML('beforeend', markupBreeds);
  });
}
updateSelect();

//-------------------------------------------------

function fetchCatByBreed(breedId) {
  // breedId = select.value;
  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });
  return fetch(`${SEARCH_URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
// fetchCatByBreed();

function updateCatInfo(breedId) {
  breedId = select.value;
  // console.log(breedId);

  fetchBreeds(breedId).then(cats => {
    const markupCat = cats
      .map(({ url, name, description, temperament }) => {
        return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${url}' alt='${name}' width='200'>`;
      })
      .join('');

    // .forEach(({ url, name, description, temperament }) => {
    //   // console.log(url);
    //   return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${url}' alt='${name}' width='200'>`;
    // });

    container.insertAdjacentHTML('beforeend', markupCat);
  });
}
updateCatInfo();
//----------------------------------------------------
