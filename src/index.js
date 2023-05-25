import { fetchBreeds } from './cat-api';

// const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

const API_KEY =
  'live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk';
//  'api_key=live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk';

// const SEARCH_URL =
//   'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';
const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

const select = document.querySelector('.breed-select');
select.addEventListener('change', fetchCatByBreed);
console.log(select);
// select.option.selected = false;
const container = document.querySelector('.cat-info');

//--------------------------------------------------------
function updateSelect(data) {
  fetchBreeds(data).then(data => {
    // console.log(data);
    const markupBreeds = data
      .map(({ id, name }) => {
        return `<option value =${id}>${name}</option>`;
      })
      .join('');

    select.insertAdjacentHTML('beforeend', markupBreeds);
  });
}
updateSelect();
console.log(select);
//-------------------------------------------------
function fetchCatByBreed(breedId) {
  console.log(breedId);
  const params = new URLSearchParams({
    api_key: API_KEY,
    // breed_ids: breedId,
    breed_ids: `${breed.id}`,
  });
  return fetch(`${SEARCH_URL}?${params}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
// fetchCatByBreed('bengal');

// function chooseBreed() {
//   const chosenBreed = select.value;
//   console.log(chooseBreed);
// }

function updateCatInfo(breedId) {
  if (select.option === breedId) {
    fetchBreeds(breedId).then(breedId => {
      // console.log(data);
      const markupCat = breedId.map(
        ({ name, description, temperament, image }) => {
          // console.log(url);
          return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${image}' alt='${name}' width='200'>`;
        }
      );
      // .join('');
      // .forEach(({ name, description, temperament, image }) => {
      //   // console.log(url);
      //   return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${image}' alt='${name}' width='200'>`;
      // });

      container.insertAdjacentHTML('beforeend', markupCat);
    });
  }
}
updateCatInfo();
//----------------------------------------------------
