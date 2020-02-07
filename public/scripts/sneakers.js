import APIHandler from './APIHandler.js'
const apiHandler = new APIHandler('http://localhost:9999');
const tagList = document.getElementById('tag_list');
const productsContainer = document.getElementById('products_grid');

function clearProductsContainer() {
  productsContainer.innerHTML = '';
}

function displayNoProductMessage() {
  productsContainer.innerHTML = '<p>No results</p>';
}

function generateProduct(product) {
  let template = `
  <a href="/sneakers/product/${product._id}" class="product-item-wrapper">
      <div class="product-img">
          <img src="${product.image}" alt="${product.name}">
      </div>
      <p class="product-name">${product.name}</p>
      <p class="product-cat">${product.category}</p>
      <p class="product-price">${product.price}</p>
  </a>`

  productsContainer.innerHTML += template;
}

function getDataFromServer(selectedTagIds) {

  let query_string = '?ajax=true' // First attribute of query string
  selectedTagIds.forEach(tagId => { query_string += '&tag_id=' + tagId })

  apiHandler.api.get(window.location.pathname + query_string)
    .then(response => {

      clearProductsContainer()

      if (!response.data.sneakers || response.data.sneakers.length === 0) {
        displayNoProductMessage();
        return
      }

      response.data.sneakers.forEach(product => generateProduct(product))

    }).catch(error => console.log(error))
}

function tagListHandler(e) {
  const selectedTagIds = []
  tagList.querySelectorAll('input').forEach(input => {
    if (input.checked) {
      selectedTagIds.push(input.getAttribute('data-tag-id'))
    }
  })

  getDataFromServer(selectedTagIds)
}

tagList.addEventListener('click', tagListHandler)
