const resultNode = document.querySelector('.result');
const btnAsync = document.querySelector('.form__button');

if (localStorage.getItem('pictureJSON')) {
    displayResult();
}

function useRequest(url) {
    return fetch(url)
        .then((response) => {
            //console.log('response', response);
            const result = response.json();
            //console.log('result', result);
            return result;
        })
        .then((data) => {
            //console.log(data);
            const pictureJSON = []
            
            data.forEach((item) => {
                pictureJSON.push({
                    src: item.download_url,
                    author: item.author,
                })
            })
            localStorage.setItem('pictureJSON', JSON.stringify(pictureJSON));
          //console.log(localStorage)
        })
        .catch(() => { console.log('error') });
}

btnAsync.addEventListener('click', async () => {
    const page = document.querySelector('.form__input_number_page').value;
    const limit = document.querySelector('.form__input_number_limit').value;

    if ((page < 1 || page > 10 || isNaN(page)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        console.log(`Номер страницы и лимит вне диапазона от 1 до 10`)
        resultNode.innerHTML = `<div class="bad-result">Номер страницы и лимит вне диапазона от 1 до 10</div>`
    }  else if (page < 1 || page > 10 || isNaN(page)) {
        console.log(`Номер страницы вне диапазона от 1 до 10`)
        resultNode.innerHTML = `<div class="bad-result">Номер страницы вне диапазона от 1 до 10</div>`
    } else if (limit < 1 || limit > 10 || isNaN(limit)) {
        console.log(`Лимит вне диапазона от 1 до 10`)
        resultNode.innerHTML = `<div class="bad-result">Лимит вне диапазона от 1 до 10</div>`
    } else if ((page >= 1 && page <= 10) && (limit >= 1 && limit <= 10)) {
        const requestResult = await useRequest(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        displayResult(requestResult)
    }
});

function displayResult() {
    let cards = '';
    const data = JSON.parse(localStorage.getItem('pictureJSON'))
    //console.log(data)
    
    data.forEach((item) => {
        const cardBlock = `
            <div class="card">
                <img
                    src="${item.src}"
                    class="card-image"
                />
                <p>${item.author}</p>
            </div>
        `;
        cards = cards + cardBlock;
    })
    resultNode.innerHTML = cards;
}