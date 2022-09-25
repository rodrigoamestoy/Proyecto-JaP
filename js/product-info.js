'use strict';    

// Gets Product Info

const ProductId = localStorage.getItem('product');

const URL = 'https://japceibal.github.io/emercado-api/products/' + ProductId + '.json';

document.addEventListener('DOMContentLoaded', async () => {

      let product = undefined;

      getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          product = resultObj.data;
          productInfo();
        }
      });

    // Product Info Display

    function productInfo() {

        const productName = document.getElementById('title');
        productName.innerText = product.name;

        container.innerHTML = `
                <div class="col product-container">
                <div class="row card-container">
                  <h5>Precio</h5>
                  <p id="price">${product.currency} ${product.cost}</p>
                </div>
                <div class="row card-container">
                  <h5>Descripción</h5>
                  <p id="description">${product.description}</p>
                </div>
                <div class="row card-container">
                  <h5>Categoría</h5>
                  <p id="category">${product.category}</p>
                </div>
                <div class="row card-container">
                  <h5>Cantidad de Unidades Vendidas</h5>
                  <p id="soldcount">${product.soldCount}</p>
                </div>
                <div class="row card-container">
                  <div class="col col-sm-3"><img id="img1" src="${product.images[0]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img2" src="${product.images[1]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img3" src="${product.images[2]}" alt=""></div>
                  <div class="col col-sm-3"><img id="img4" src="${product.images[3]}" alt=""></div>
                </div>
              </div>
                `
        }

        // Gets Product Comments Info

        const COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/' + ProductId + '.json';

        let comments = undefined;

      getJSONData(COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
          comments = resultObj.data;
          productComments();
          starRating()
  }
});

        // Comments Display

        function productComments() {

            const commentsContainer = document.getElementById('comments-container');

            for (let i = 0; i < comments.length; i++) {
              
            commentsContainer.innerHTML += `
            <div class="row comment-container">
                <div class="col">
                    <h4>${comments[i].user} ${comments[i].dateTime}</h4>
                    <p>${comments[i].description}</p>
                </div>
                <div class="col comment-container" id="rating">
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
            </div>
                `;
            }
    };

    // Displays Stars Ratings

    function starRating() {

      for (let i = 0; i < comments.length; i++) {

        const iconContainer = document.querySelectorAll('#rating');

        // Goes trough the i elements (odd numbers) and colors them if
        // they fulfill the requirements

        if (comments[i].score === 5) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
          iconContainer[i].childNodes[9].classList.add('checked');
        } if (comments[i].score === 4) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
          iconContainer[i].childNodes[7].classList.add('checked');
        } if (comments[i].score === 3) {
          iconContainer[i].childNodes[3].classList.add('checked');
          iconContainer[i].childNodes[5].classList.add('checked');
        } if (comments[i].score === 2) {
          iconContainer[i].childNodes[3].classList.add('checked');
        }
      }
    };

    // Uploads comment when onclick

    const uploadButton = document.getElementById('upload');

    uploadButton.addEventListener('click', () => {
      uploadComments();
    })
  
    function uploadComments() {

      let comentario = document.getElementById('opinion').value;
      let puntuacion = document.getElementById('puntuacion').value;
      let user = localStorage.getItem('user');

      // Gets Actual Time

      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;

      // Adds Comment

      const commentsContainer = document.getElementById('comments-container');

      if (puntuacion == 5) {

      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>

                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                </div>
            </div>
      `
    } else if (puntuacion == 4) {

      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>

                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
      `

    } else if (puntuacion == 3) {
      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>

                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
      `
    } else if (puntuacion == 2) {
      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>

                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
      `
    } else {
      commentsContainer.innerHTML += 
      `
      <div class="row comment-container" id="myComment">
                <div class="col">
                    <h4>${user} ${dateTime}</h4>
                    <p>${comentario}</p>
                </div>

                <div class="col comment-container" id="rating">
                    <i class="fa fa-star checked"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
      `
    }
  }

  // Gets products of the same category

  const RELATED_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';

  let products = undefined;

  getJSONData(RELATED_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
      products = resultObj.data.products;
      relatedProducts();
      }
    }); 

    

  function relatedProducts() {

    const relatedImg1 = document.getElementById('img-1'),
    relatedImg2 = document.getElementById('img-2'),
    relatedImg3 = document.getElementById('img-3'),
    fig1 = document.getElementById('fig-1'),
    fig2 = document.getElementById('fig-2'),
    fig3 = document.getElementById('fig-3');

    const relatedProductsArray = [];

    for (let i = 0; i < products.length; i++) {

      if (String(ProductId) !== String(products[i].id)) {
        relatedProductsArray.push(i)
      }
    }

    relatedImg1.src = products[relatedProductsArray[0]].image;
    relatedImg2.src = products[relatedProductsArray[1]].image;
    relatedImg3.src = products[relatedProductsArray[2]].image;

    fig1.innerHTML = products[relatedProductsArray[0]].name;
    fig2.innerHTML = products[relatedProductsArray[1]].name;
    fig3.innerText = products[relatedProductsArray[2]].name;

    relatedImg1.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[0]].id);
      location.reload();
    });

    relatedImg2.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[1]].id);
      location.reload();
    });

    relatedImg3.addEventListener('click', () => {
      localStorage.setItem('product', products[relatedProductsArray[2]].id);
      location.reload();
    })
  }
});