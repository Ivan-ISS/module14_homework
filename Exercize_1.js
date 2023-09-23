// Задание 1: Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const parser = new DOMParser();

const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
    `;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentNode = xmlDOM.querySelectorAll('student');

const result = {};
result.list = new Array();

for (let i = 0; i < studentNode.length; i = i + 1) {
    const nameNode = xmlDOM.querySelectorAll('name')[i];
    const firstNode = xmlDOM.querySelectorAll('first')[i];
    const secondNode = xmlDOM.querySelectorAll('second')[i];
    const ageNode = xmlDOM.querySelectorAll('age')[i];
    const profNode = xmlDOM.querySelectorAll('prof')[i];
    const langAttr = nameNode.getAttribute('lang');

    result.list.push
    ({
        name: `${firstNode.textContent} ${secondNode.textContent}`,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr
    })
}

console.log(result);