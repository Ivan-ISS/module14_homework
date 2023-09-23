// Задание 3: Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
//
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

function useRequest(url, async, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, async);

    xhr.onload = function() {
        if (xhr.status != 200) { 
            console.log('Статус ответа: ', xhr.status);
        } else {
              //console.log('Результат: ', JSON.parse(xhr.response));
            const result = JSON.parse(xhr.response);
          if (callback) {
              callback(result);
          }
        }
    };

    xhr.onprogress = function(event) {
        console.log(`Загружено ${event.loaded} из ${event.total}`)
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}

const resultNode = document.querySelector('.result');

function displayResult(apiData) {
    let cards = '';
  
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img
                    src="${item.download_url}"
                    class="card-image"
                />
                <p>${item.author}</p>
            </div>
        `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

const btn = document.querySelector('.form__button');

btn.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    if (value >= 1 && value <= 10) {
        useRequest(`https://picsum.photos/v2/list/?limit=${value}`, true, displayResult);
    } else {
        console.log(`Число вне диапазона от 1 до 10`)
        resultNode.innerHTML = `<div class="bad-result">Число вне диапазона от 1 до 10</div>`
    }
});