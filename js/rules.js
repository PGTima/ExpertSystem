let pQuestion = document.getElementById("quest");
let state = 1;
var count = 0;
let message;
let work_mem = [];
let no_include = [];
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
            message: null,
            prioritet: 0
        },
        {
            //AND
            id: 2,
            flag: true,
            add_fact: 12,
            facts_id: [1, 3],
            message: null,
            prioritet: 0
        },
        {
            //AND
            id: 3,
            flag: true,
            add_fact: 14,
            facts_id: [4, 12],
            message: null,
            prioritet: 0
        },
        {
            //AND
            id: 4,
            flag: true,
            add_fact: 15,
            facts_id: [6, 12],
            message: null,
            prioritet: 0
        },
        {
            //OR
            id: 5,
            flag: false,
            facts_id: [5, 7],
            message: null,
            prioritet: 0
        },
        {
            //AND
            id: 6,
            flag: true,
            add_fact: 16,
            facts_id: [8, 13],
            message: null,
            prioritet: 0
        },
        {
            id: 7,
            flag: true,
            add_fact: 17,
            facts_id: [9],
            message: null,
            prioritet: 0
        },
        {
            //AND
            id: 8,
            flag: true,
            add_fact: 18,
            facts_id: [10, 11],
            message: null,
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

function change_yes() {
    let check1 = document.getElementById("yes");
    let check2 = document.getElementById("no");
    if (check1.checked == true) {
        check2.checked = false;
    } else {
        check2.checked = true;
    }
}
$(document).ready(function() {
    let html = "<p>Начало!!!</p>";
    pQuestion.innerHTML = html;
    state = 1;
});

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
function nextQuestion(id) {
    pQuestion.innerHTML = factsJson.facts[id].name;
}

function result() {
    if (state != 1) {
        let check1 = document.getElementById("yes");
        let check2 = document.getElementById("no");
        //выбран ответ
        if (check1.checked == true) {
            for (let i = 0; i < factsJson.facts.length; i++) {
                if (!work_mem.includes(factsJson.facts[i].id) &&
                    factsJson.facts[i].flag == true &&
                    !no_include.includes(factsJson.facts[i].id)
                ) {
                    //добавим правило
                    work_mem.push(factsJson.facts[i].id);
                    //выведем след вопрос
                    nextQuestion(i + 1);
                    count = i + 1;
                    //цикл по всем правилам
                    for (let j = 0; j < json.rules.length; j++) {
                        let y = 0;
                        let length = json.rules[j].facts_id.length;
                        //цикл по правилам в раб памяти
                        for (let l = 0; l < work_mem.length; l++) {
                            if (
                                json.rules[j].facts_id.includes(work_mem[l]) &&
                                !work_mem.includes(json.rules[j].add_fact)
                            ) {
                                y++;
                                if (y == length) {
                                    work_mem.push(json.rules[j].add_fact);
                                    res(json.rules[j].add_fact);
                                }
                            }
                        }
                    }
                    break;
                }
            }
        } else if (check1.checked == false) {
            for (let i = 0; i < factsJson.facts.length; i++) {
                // выводим вопрос, которого нет в раб памяти и не стоит запр. флаг
                if (!work_mem.includes(factsJson.facts[i].id) &&
                    factsJson.facts[i].flag == true &&
                    !no_include.includes(factsJson.facts[i].id)
                ) {
                    no_include.push(factsJson.facts[i].id);
                    nextQuestion(i + 1);
                    count = i + 1;
                    break;
                }
            }
        }
    } else {
        nextQuestion(0);
        state = 2;
    }
}
//вывод
function res(id) {
    for (let j = 0; j < json.rules.length; j++) {
        if (json.rules[j].facts_id.includes(id) && json.rules[j].message != null) {
            alert(json.rules[j].message);
            location.reload(true);
            break;
        }
    }
}
