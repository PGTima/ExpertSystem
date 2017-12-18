let pQuestion = document.getElementById("quest");
let state = "";
var count = 0;
let message;
let work_mem = [];
let nextStateTrue;
let nextStateFalse;
let divCheck = document.getElementById("check");
/**
 * JSON  с фактами
 */
let factsJson = {
    facts: [{
            id: 1,
            flag: true,
            name: "высокая температура"
        },
        {
            id: 2,
            flag: true,
            name: "Заложен ли у вас нос"
        },
        {
            id: 3,
            flag: true,
            name: "боль в голова"
        },
        {
            id: 4,
            flag: true,
            name: "температура больше 39"
        },
        {
            id: 5,
            flag: true,
            name: "высокое давление"
        },
        {
            id: 6,
            flag: true,
            name: "покраснение глаз"
        },
        {
            id: 7,
            flag: true,
            name: "плохой сон"
        },
        {
            id: 8,
            flag: true,
            name: "отеки или головокружения"
        },
        {
            id: 9,
            flag: true,
            name: "острая боль в животе"
        },
        {
            id: 10,
            flag: true,
            name: "резкая боль в животе"
        },
        {
            id: 11,
            flag: true,
            name: "есть изжога"
        },
        {
            id: 12,
            flag: false,
            name: "Заболевание тяжелое"
        },
        {
            id: 13,
            flag: false,
            name: "Проблемы с сердцем"
        },
        {
            id: 14,
            flag: false,
            name: "ГРИПП"
        },
        {
            id: 15,
            flag: false,
            name: "ОРВИ"
        },
        {
            id: 16,
            flag: false,
            name: "Гипертония"
        },
        {
            id: 17,
            flag: false,
            name: "Аппендицит"
        },
        {
            id: 18,
            flag: false,
            name: "Язва"
        }
    ]
};
/**
 * JSON  с правилами для ЭС
 */
let json = {
    rules: [{
            //AND
            id: 1,
            flag: true,
            add_fact: 12,
            facts_id: [1, 2],
            prioritet: 0
        },
        {
            //AND
            id: 2,
            flag: true,
            add_fact: 12,
            facts_id: [1, 3],
            prioritet: 0
        },
        {
            //AND
            id: 3,
            flag: true,
            add_fact: 14,
            facts_id: [4, 12],
            prioritet: 0
        },
        {
            //AND
            id: 4,
            flag: true,
            add_fact: 15,
            facts_id: [6, 12],
            prioritet: 0
        },
        {
            //OR
            id: 5,
            flag: false,
            facts_id: [5, 7],
            prioritet: 0
        },
        {
            //AND
            id: 6,
            flag: true,
            add_fact: 16,
            facts_id: [8, 13],
            prioritet: 0
        },
        {
            id: 7,
            flag: true,
            add_fact: 17,
            facts_id: [9],
            prioritet: 0
        },
        {
            //AND
            id: 8,
            flag: true,
            add_fact: 18,
            facts_id: [10, 11],
            prioritet: 0
        },
        {
            //OR
            id: 9,
            flag: false,
            facts_id: [14, 15],
            message: "Лечение дом",
            prioritet: 0
        },
        {
            //And or or
            id: 10,
            flag: false,
            facts_id: [16, 14, 17, 18],
            message: "Госпитализация",
            prioritet: 0
        }
    ]
};
$(document).ready(function() {
    let html = factsJson.facts[0].name;
    pQuestion.innerHTML = html;
});

function change_yes() {
    let check1 = document.getElementById("yes");
    let check2 = document.getElementById("no");
    if (check1.checked == true) {
        check2.checked = false;
    } else {
        check2.checked = true;
    }
}

function change_no() {
    let check1 = document.getElementById("yes");
    let check2 = document.getElementById("no");
    if (check2.checked == true) {
        check1.checked = false;
    } else {
        check1.checked = true;
    }
}
/**
 * Функция для обработки состояния
 */
function result() {
    let check1 = document.getElementById("yes");
    let check2 = document.getElementById("no");
    //выбрали ответ
    if (check1.checked == true) {
        for (let i = 0; i < factsJson.facts.length; i++) {
            // выводим вопрос, которого нет в раб памяти и не стоит запр. флаг
            if (!work_mem.includes(factsJson.facts[i].id) &&
                factsJson.facts[i + 1].flag == true
            ) {
                pQuestion.innerHTML = factsJson.facts[i + 1].name;
                work_mem.push(factsJson.facts[i].id);
                break;
            }
        }
    } else if (check1.checked == false) {
        for (let i = 0; i < factsJson.facts.length; i++) {
            // выводим вопрос, которого нет в раб памяти и не стоит запр. флаг
            if (!work_mem.includes(factsJson.facts[i].id) &&
                factsJson.facts[i].flag == true
            ) {
                pQuestion.innerHTML = factsJson.facts[i].name;
                break;
            }
        }
    }
    //Цикл по всем правилам
    for (let i = 0; i < json.rules.length; i++) {
        let len = json.rules[i].facts_id.length;
        let y = 0;
        //цикл по фактам в рабочей памяти
        for (let k = 0; k < work_mem.length; k++) {
            //если факт из рабочей памяти есть в массиве фактов правила
            if (json.rules[i].facts_id.includes(work_mem[k])) {
                y++;
                //если кол-во фактов в раб памяти == длине массива фактов правила i-того
                //и в массиве фактов раб.памяти нет следующего факта
                //то добавляем в массив раб памяти еще один факт
                if (y == len && work_mem.includes(json.rules[i].add_fact) == false) {
                    work_mem.push(json.rules[i].add_fact);
                }
            } else {
                break;
            }
        }
    }
    //Вывод
    if (work_mem.includes(14) && work_mem.includes(15)) {
        alert(json.rules[9].message);
    } else if (
        (work_mem.includes(16) && work_mem.includes(14)) ||
        (work_mem.includes(17) && work_mem.includes(18))
    ) {
        alert(json.rules[10].message);
    }
}
