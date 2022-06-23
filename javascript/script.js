// Переменные
let ms = 0;
    sec = 0;
    min = 0;
    hour = 0;
    state = '';
    num = 0;
let timerForward;
let timerBackward;
let readings;
let reverse;
let saveList = [];



// Элементы
let results = document.getElementById('results');
let start = document.getElementById('start');
let miliseconds = document.getElementById('miliseconds');
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let hours = document.getElementById('hours');
let btnTurn = document.getElementById('btn_turn');
let btnSave = document.getElementById('btn_save');
let btnReset = document.getElementById('btn_reset');


// Извлечение данных из хранилища
ms = +localStorage.getItem('ms');
sec = +localStorage.getItem('sec');
min = +localStorage.getItem('min');
hour = +localStorage.getItem('hour');
reverse = localStorage.getItem('reverse');
num = localStorage.getItem('num');
state = localStorage.getItem('state');
localStorage.getItem('btnStart') === null ? start.innerHTML = 'Старт' : start.innerHTML = localStorage.getItem('btnStart'); 
localStorage.getItem('reverse') === null ? reverse = 'false' : reverse = localStorage.getItem('reverse');


// продолжение работы таймера после перезагрузки страницы
if (start.textContent === 'Стоп' || start.textContent === 'Продолжить') {
    btnTurn.removeAttribute('hidden');
    btnSave.removeAttribute('hidden');
    btnReset.removeAttribute('hidden');
    if (start.innerHTML === 'Стоп') {
        if (reverse === 'true') {
            timerBackward = setInterval(timeBackward, 10)
        } else if (reverse === 'false') {
            timerForward = setInterval(timeForward, 10)
        }
   }
   if (start.innerHTML === 'Продолжить') {
       if (reverse === 'true') {
           clearInterval(timerBackward);
       } else if (reverse === 'false') {
           clearInterval(timerForward);
       }
   }  
}
// Восстановление данных из хранилища после перезагрузки
if (localStorage.getItem('saveList')) {
    saveList = JSON.parse(localStorage.getItem('saveList'));
    for (list of saveList) {
        let div = document.createElement('div');
        div.textContent = list;
        results.prepend(div);
    }
}

// Отображение цифр на экране
let milisecondsScreen = () => {
    ms < 10 ? miliseconds.textContent = '0' + ms : miliseconds.textContent = ms;
}

let secondsScreen = () => {
    sec < 10 ? seconds.textContent = '0' + sec : seconds.textContent = sec;
}
let minutesScreen = () => {
    min < 10 ? minutes.textContent = '0' + min : minutes.textContent = min;
}
let hoursScreen = () => {
    hour < 10 ? hours.textContent = '0' + hour : hours.textContent = hour;
}
// таймер вперед  функция
function timeForward() {
    ms++
    milisecondsScreen();
    localStorage.setItem('ms', ms);
    if (ms > 99) {
        ms = 0;
        milisecondsScreen();
        sec++;
        localStorage.setItem('sec', sec);
        secondsScreen()
        if (sec > 59) {
            sec = 0;
            secondsScreen();
            min++;
            localStorage.setItem('min', min);
            minutesScreen();
            if (min > 59) {
                min = 0;
                minutesScreen();
                hour++
                localStorage.setItem('hour', hour);
                hoursScreen();
            }
        }
    }
    readings = hours.textContent + ':' + minutes.textContent + ':' + seconds.textContent + '.' + miliseconds.textContent;    
}
    
// сохранение функция
let save = () => {
    num++;
    let div = document.createElement('div');
    div.innerHTML = `Результат ${num}: ${readings}`;
    results.prepend(div);
    saveList.push(div.textContent);
    localStorage.setItem('saveList', JSON.stringify(saveList));
    localStorage.setItem('num', num);
}
// реверс функция
function timeBackward() {
    if (hour || min || sec || ms > 0) {
        ms--; 
        milisecondsScreen() 
        localStorage.setItem('ms', ms);
        if (ms < 0) {
            ms = 99;
            milisecondsScreen() 
            sec--;
            localStorage.setItem('sec', sec);
            secondsScreen();
            if (sec < 0) {
                sec = 59;
                secondsScreen();
                min--;
                localStorage.setItem('min', min);
                minutesScreen();
                if (min < 0) {
                    min = 59;
                    minutesScreen();
                    hour--;
                    localStorage.setItem('hour', hour);
                    hoursScreen();  
                }
            }
        } 
        readings = hours.textContent + ':' + minutes.textContent + ':' + seconds.textContent + '.' + miliseconds.textContent;    
    } else {
        resetWithoutResults();
    }
}
// Обнуление  функция с сохранением таблицы результатов
let resetWithoutResults = () => {
    clearInterval(timerForward);
    clearInterval(timerBackward);
    btnReset.setAttribute('hidden', true);
    btnTurn.setAttribute('hidden', true);
    btnSave.setAttribute('hidden', true);
    localStorage.removeItem('ms');
    localStorage.removeItem('sec');
    localStorage.removeItem('min');
    localStorage.removeItem('hour');
    localStorage.removeItem('reverse');
    localStorage.removeItem('btnStart');
    localStorage.removeItem('state');
    reverse = 'false';
    start.innerHTML = 'Старт';
    state = '';
}
// обнуление всего функция
let resetAll = () => {
    clearInterval(timerForward);
    clearInterval(timerBackward);
    btnReset.setAttribute('hidden', true);
    btnTurn.setAttribute('hidden', true);
    btnSave.setAttribute('hidden', true);
    localStorage.clear();
    reverse = 'false';
    ms = 0;
    sec = 0;
    min = 0;
    hour = 0;
    num = 0;
    start.innerHTML = 'Старт';
    results.innerHTML = '';
    state = '';
    milisecondsScreen();
    secondsScreen();
    minutesScreen();
    hoursScreen();  
}

// вывод цифр на экран
milisecondsScreen();
secondsScreen();
minutesScreen();
hoursScreen();

// Клик на кнопке старт/стоп/продолжить
start.addEventListener('click', () => {  
    if (start.innerHTML === 'Старт') {
        timerForward = setInterval(timeForward, 10); 
        start.innerHTML ='Стоп'
        state = 'stop';
        btnTurn.removeAttribute('hidden');
        btnSave.removeAttribute('hidden');
        btnReset.removeAttribute('hidden');
    } else if (state === 'stop') {
        if (reverse === 'true') {
            clearInterval(timerBackward);
        } else if (reverse === 'false') {
            clearInterval(timerForward);
        }
        start.innerHTML = 'Продолжить';
        state = 'continue';
        localStorage.setItem
    } else if (state === 'continue') {
        if (reverse === 'true') {
            timerBackward = setInterval(timeBackward, 10);
        } else if (reverse === 'false') {
            timerForward = setInterval(timeForward, 10);
        }
        start.innerHTML = 'Стоп'
        state = 'stop';
    }
    localStorage.setItem('btnStart', start.innerHTML);
    localStorage.setItem('state', state);
 
})
// клик на кнопке развернуть
btnTurn.addEventListener('click', () => {
    if (start.innerHTML === 'Стоп') {
         if (reverse === 'true') {
            clearInterval(timerBackward);
            timerForward = setInterval(timeForward, 10);
            reverse = 'false';
        } else if (reverse === 'false') {
            clearInterval(timerForward);
            timerBackward = setInterval(timeBackward, 10);
            reverse = 'true';
        }
    }
    if (start.innerHTML === 'Продолжить') {
        start.innerHTML = 'Стоп';
        if (reverse === 'true') {
            clearInterval(timerBackward);
            timerForward = setInterval(timeForward, 10);
            reverse = 'false';
        } else if (reverse === 'false') {
            clearInterval(timerForward);
            timerBackward = setInterval(timeBackward, 10);
            reverse = 'true';
        }
        state = 'stop';  
    }
    localStorage.setItem('reverse', reverse);  
})
// клик на кнопке Сохранить
btnSave.onclick = save;
// клик на кнопке обнулить
btnReset.onclick = resetAll;





