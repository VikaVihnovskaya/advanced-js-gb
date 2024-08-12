// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах.
// Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом,
// данный отзыв удаляется из LocalStorage).


const productEl = document.querySelector('.product-input')
const inputEl = document.querySelector('.review-input');
const buttonEl = document.querySelector('.button');
const reviewsEl = document.getElementById('reviews-list');
let reviewsList = JSON.parse(localStorage.getItem('reviewsList')) || [];

// Обработчик клика на кнопку отправки
buttonEl.addEventListener('click', () => {
  const newReview =
      {
        productName: productEl.value.trim(),
        reviewText: inputEl.value.trim(),
        reviewID: counter.returnAndIncreaseLastID()
      }

  if (newReview.productName !== '' && newReview.reviewText !== '') {
    reviewsList.push(newReview);
    productEl.value = '';
    inputEl.value = '';
    displayReviews();
    alert('Отзыв сохранен!');
  }
});

// buttonEl.addEventListener('click', () => {
//   if (inputEl.value !== '') {
//     localStorage.setItem('savedText', inputEl.value.trim());
//     alert('Отзыв сохранен!');
//   } else {
//     reviewsContainer.textContent = 'Введите текст!';
//   }
// });

// Функция для отображения и обновления отзывов
function displayReviews() {
  reviewsEl.innerHTML = ''; // Очистить контейнер

// перебираем массив объектов
  reviewsList.forEach(review => {
    reviewsEl.insertAdjacentHTML('afterbegin', `
        <div class="review-content">
        <span class="review-id">${review.reviewID}</span>
        <h3 class="product-name">${review.productName}</h3>
        <span class="review-text">${review.reviewText}</span>
        <i class="fa fa-regular fa-trash delete-icon""></i>
        </div>
        `)
  });
  const deleteIconEls = document.querySelectorAll('.delete-icon');

  // удаления отзыва по нажатию на корзину
  deleteIconEls.forEach(deleteIconEl => {
    deleteIconEl.addEventListener('click', function (event) {
      let thisID = event.currentTarget.parentElement.querySelector('.review-id').textContent;
      console.log(thisID);
      removeReview(thisID);
    });
  });

  localStorage.setItem('reviewsList', JSON.stringify(reviewsList));
}

// Загрузка начальных данных при загрузке страницы
window.onload = displayReviews;

//Метод удаления отзыва
function removeReview(id) {
  reviewsList = reviewsList.filter(review => review.reviewID !== parseInt(id));
  localStorage.setItem('reviewsList', JSON.stringify(reviewsList));
  displayReviews();
}

//Счетчик для присвоения ID отзывам
class Counter {
  value = learnLastID();
  returnAndIncreaseLastID() {
    return ++this.value;
  }
}

let counter = new Counter();

//Метод узнавания значения последнего идентификатора у отзывов, чтобы можно
// было присваивать корректные значения ID новому отзыву после удаления другого отзыва


function learnLastID() {
  const reviewIDs = [];
  if (reviewsList.length <= 0) {
    reviewIDs.push(0);
  } else if (reviewsList.length === 1) {
    reviewIDs.push(reviewsList[0].reviewID);
    return reviewsList[0].reviewID;
  } else {
    reviewsList.forEach(review => {
      reviewIDs.push(Object.values(review).reviewID);
    });
  }
  return Math.max(...reviewIDs);

}
