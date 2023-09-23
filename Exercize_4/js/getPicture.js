// Задание 4: Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
//
// При клике на кнопку происходит следующее:
//
// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.

function useRequest(url) {
    fetch(url)
      .then((response) => {
        console.log('response', response);
        const result = response.json();
        //console.log('result', result);
        resultNode.innerHTML = 
          `<div class="card">
            <img
              class="card-image"
              src="${response.url}"
            />
          </div>`
      })
      .catch(() => { console.log('error') });
}

const resultNode = document.querySelector('.result');
const btn = document.querySelector('.form__button');

btn.addEventListener('click', () => {
    const width = document.querySelector('.form__input_number_width').value;
    const height = document.querySelector('.form__input_number_height').value;

    if ((width >= 100 && width <= 300) && (height >= 100 && height <= 300)) {
        useRequest(`https://picsum.photos/${width}/${height}`);
    } else {
      console.log(`Одно из чисел вне диапазона от 100 до 300`)
      resultNode.innerHTML = `<div class="bad-result">Одно из чисел вне диапазона от 100 до 300</div>`
    }
});