let pQuestion = document.getElementById("quest");
let state = "";
let message;
let nextStateTrue;
let nextStateFalse;
let divCheck = document.getElementById("check");
/**
 * JSON  с правилами для ЭС
 */
let json = {
    rules: [{
            id: 1,
            question: "У вас есть жалобы на здоровье (yes/no)?",
            name: "health-state",
            prev_rul: [],
            nextStateTrue: "health-state-disease",
            nextStateFalse: null,
            endMessage: "Вы здоровы!!!Удачного вам дня",
            prioritet: 0
        },
        {
            id: 2,
            question: "У вас  болит голова (yes/no)?",
            name: "disease-state-head",
            prev_rul: ["health-state disease"],
            nextStateTrue: "disease-state headache yes",
            nextStateFalse: "disease-state headache no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 3,
            question: "У вас  болит живот (yes/no)?",
            name: " disease-state-pain",
            prev_rul: ["health-state disease", "disease-state headache no"],
            nextStateTrue: "disease-state pain yes",
            nextStateFalse: "disease-state pain no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 4,
            question: "У вас есть боль в области сердца (yes/no)?",
            name: " disease-state-heart",
            prev_rul: [
                "health-state disease",
                "disease-state headache no",
                "disease-state pain no"
            ],
            nextStateTrue: "disease-state heart yes",
            nextStateFalse: "disease-state heart no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 5,
            question: "У вас высокая температура (yes/no)?",
            name: "disease-state-head-temperature",
            prev_rul: ["disease-state headache yes"],
            nextStateTrue: "head-state temperature yes",
            nextStateFalse: "head-state temperature no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 6,
            question: "Вы чихаете (yes/no)?",
            name: "disease-state-head-sneezing",
            prev_rul: ["disease-state headache yes", "head-state temperature no"],
            nextStateTrue: "head-state sneezing yes",
            nextStateFalse: "head-state sneezing no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 7,
            question: "У вас есть заложенность носа или боль в горле (yes/no)?",
            name: "disease-state-head-throat",
            prev_rul: ["disease-state headache yes", "head-state temperature yes"],
            nextStateTrue: "head-state throat yes",
            nextStateFalse: "head-state throat no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 8,
            question: "У вас температура выше 39 градусов (yes/no)?",
            name: "head-state-help-temperature",
            prev_rul: ["head-state throat yes"],
            nextStateTrue: "По всей вероятности у вас ГРИПП. Необходимо обратиться в больницу!!! ",
            nextStateFalse: null,
            endMessage: "По всей вероятности у вас ОРВИ. Необходимо обратиться в больницу!!! ",
            prioritet: 0
        },
        {
            id: 9,
            question: "Проблемы со здоровьем начались не давно(2-3 дня) (yes/no)?",
            name: "head-state-sneezing",
            prev_rul: ["head-state sneezing yes"],
            nextStateTrue: "Вы простудились!!!рекомендуем пить чай с медом и лимоном, а так же можно принять римантадин.Будьте здоровы!!!",
            nextStateFalse: null,
            endMessage: null,
            prioritet: 0
        },
        {
            id: 10,
            question: "Ваша болезнь бурно развивалась? (yes/no)?",
            name: "head-state-turbulent",
            prev_rul: ["head-state sneezing yes"],
            nextStateTrue: "По всей вероятности у вас ОРВИ. Необходимо обратиться в больницу!!! ",
            nextStateFalse: "Вы простудились!!!рекомендуем пить чай с медом и лимоном, а так же можно принять римантадин.Будьте здоровы!!!",
            endMessage: null,
            prioritet: 10
        },
        {
            id: 11,
            question: "Какая у вас боль в животе резкая (yes/no)?",
            name: "disease-state-pain-sharp",
            prev_rul: ["disease-state pain yes"],
            nextStateTrue: "pain-state sharp yes",
            nextStateFalse: "Какая у вас боль в животе острая (yes/no)? ",
            endMessage: "У вас по всей вероятности химический ожог слизистых оболочек или отравление!!!Примите активированное угля!!!",
            prioritet: 0
        },
        {
            id: 12,
            question: "У вас есть изжога (yes/no)?",
            name: "disease-state-pain-help1",
            prev_rul: ["pain-state acute yes"],
            nextStateTrue: "У вас по всей вероятности язва !!!Необходимо срочно обратиться к врачу!!!",
            nextStateFalse: "У вас по всей видимости аппендицит !!!Необходимо срочно обратиться к врачу!!!",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 13,
            question: "У вас есть изжога (yes/no)?",
            name: "disease-state-pain-help",
            prev_rul: ["pain-state sharp yes"],
            nextStateTrue: "У вас по всей вероятности химический ожог слизистых оболочек или отравление!!!Примите активированное угля!!!",
            nextStateFalse: null,
            endMessage: null,
            prioritet: 0
        },
        {
            id: 14,
            question: "У вас давление выше 140 (yes/no)?",
            name: "disease-state-heart-arterial-pressure",
            prev_rul: ["disease-state heart yes"],
            nextStateTrue: "heart-arterial-pressure yes",
            nextStateFalse: "heart-arterial-pressure no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 15,
            question: "У вас есть покраснение глаз (yes/no)?",
            name: "disease-state-heart-arterial-pressure-high",
            prev_rul: ["heart-arterial-pressure yes"],
            nextStateTrue: "heart-eyes  yes",
            nextStateFalse: "heart-eyes  no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 16,
            question: "У вас есть слабость в теле (yes/no)?",
            name: "disease-state-heart-weakness",
            prev_rul: ["heart-arterial-pressure no"],
            nextStateTrue: "heart-weakness  yes",
            nextStateFalse: "heart-weakness  no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 17,
            question: "У вас есть отеки или головокружения (yes/no)?",
            name: "heart-weakness  yes",
            prev_rul: ["heart-arterial-pressure no"],
            nextStateTrue: "heart-dizziness  yes",
            nextStateFalse: "heart-dizziness  no",
            endMessage: null,
            prioritet: 0
        },
        {
            id: 18,
            question: "У вас плохой сон (yes/no)?",
            name: "disease-state-heart-help",
            prev_rul: ["heart-weakness  yes", "heart-dizziness  yes"],
            nextStateTrue: null,
            nextStateFalse: null,
            endMessage: "У вас по всей вероятности проблемы с сердцем!!!Выпейте зеленого чая, успокойтесь, полежите на кровати!!!Когда полегчает обратитесь к кардиологу",
            prioritet: 0
        },
        {
            id: 19,
            question: "У вас плохой сон (yes/no)?",
            name: "disease-state-heart-help1",
            prev_rul: ["heart-eyes  yes"],
            nextStateTrue: null,
            nextStateFalse: null,
            endMessage: "У вас по всей вероятности проблемы с сердцем!!!Выпейте зеленого чая, успокойтесь, полежите на кровати!!!Когда полегчает обратитесь к кардиологу",
            prioritet: 0
        },
        {
            id: 20,
            question: null,
            name: "unknown",
            prev_rul: null,
            nextStateTrue: null,
            nextStateFalse: null,
            endMessage: "К сожалению мы не смогли определить чем вы больны, пожалуйста обратитесь в больницу!!!",
            prioritet: 0
        }
    ]
};
$(document).ready(function() {
    let html = json.rules[0].question;
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
    switch (state) {
        case 2:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[4].question;
                state = json.rules[4].id;
            } else {
                pQuestion.innerHTML = json.rules[2].question;
                state = json.rules[2].id;
            }
            break;
        case 3:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[10].question;
                state = 22;
            } else {
                pQuestion.innerHTML = json.rules[3].question;
                state = json.rules[3].id;
            }
            break;
        case 4:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[13].question;
                state = json.rules[13].id;
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 5:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[6].question;
                state = json.rules[6].id;
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 6:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[8].question;
                message = 1;
                state = 21;
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 7:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[7].question;
                message = 0;
                state = 21;
            } else {
                alert(json.rules[7].endMessage);
                state = "-";
            }
            break;
        case 12:
            if (check1.checked == true) {
                alert(json.rules[11].nextStateTrue);
                state = "-";
            } else {
                alert(json.rules[11].nextStateFalse);
                state = "-";
            }
            break;
        case 13:
            break;
        case 14:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[15].question;
                state = json.rules[15].id;
            } else {
                pQuestion.innerHTML = json.rules[14].question;
                state = json.rules[14].id;
            }
            break;
        case 15:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[18].question;
                state = json.rules[18].id;
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 16:
            if (check1.checked == true) {
                pQuestion.innerHTML = json.rules[17].question;
                message = 3;
                state = 21;
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 19:
            if (check1.checked == true) {
                alert(json.rules[18].endMessage);
                state = "-";
            } else {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 20:
            break;
        case 21:
            if (check1.checked == true && message == 0) {
                alert(json.rules[7].nextStateTrue);
                state = "-";
            } else if (check1.checked == false && message == 0) {
                alert(json.rules[7].endMessage);
                state = "-";
            } else if (check1.checked == true && message == 1) {
                alert(json.rules[8].nextStateTrue);
                state = "-";
            } else if (check1.checked == true && message == 2) {
                alert(json.rules[10].endMessage);
                state = "-";
            } else if (check1.checked == true && message == 3) {
                alert(json.rules[17].endMessage);
                state = "-";
            } else if (check1.checked == false && message == 3) {
                alert(json.rules[19].endMessage);
                state = "-";
            }
            break;
        case 22:
            if (check1.checked == true) {
                alert(json.rules[10].endMessage);
                state = "-";
            } else {
                pQuestion.innerHTML = json.rules[11].question;
                state = json.rules[11].id;
            }
            break;
        default:
            break;
    }
    if (check1.checked == true && state == "") {
        pQuestion.innerHTML = json.rules[1].question;
        state = json.rules[1].id;
    } else if (check1.checked == false && state == "") {
        alert(json.rules[0].endMessage);
        state = 1;
    }
    //Если дошли до конца обновляем страницу
    if (state == "-" || state == 1) {
        location.reload(true);
    }
}