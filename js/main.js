// создано поле
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// заполнение рабочего поля ячейками в 100 штук
for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

//присвоени ячейкам координаты
let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (let i=0; i<excel.length; i++) {
    if (x>10) {
        x=1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;    
}

// функции змеи (зандомное расположение змеи при загрузке игры)
function generateSnake() {
    let posX = Math.round(Math.random() * (10-3) + 3);
    let posY = Math.round(Math.random() * (10-1) + 1);
    return [posX , posY];
}

// вывод в консоль
let coordinates = generateSnake();


//создание змеи
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]') ];

for (let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

//создание мышки
let mouse;

function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10-3) + 3);
        let posY = Math.round(Math.random() * (10-1) + 1);
        return [posX , posY];
    }

    let mouseCoordinates = generateMouse();
    console.log(mouseCoordinates);
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

    while(mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    }

    mouse.classList.add('mouse');
    
}

createMouse();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);

let score = 0;


//движение змеи
function move() {
    let snakeCoordinates = [snakeBody [0]. getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    //движение змеи вл всех направлениях
    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }

    //змея ест мышь
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;

    }

    //конец игры
    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`Ваши очки: ${score} Игра окончена`);
        }, 200);

        clearInterval(interval);
        snakeBody[0].style.background = 'rgb(223, 85, 85)';
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 300);

//движение змеи во всех направлениях
window.addEventListener('keydown', function (e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction!= 'right') {
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction!= 'downe') {
            direction = 'up';
            steps = false;
        }
        else if (e.keyCode == 39 && direction!= 'left') {
            direction = 'right';
            steps = false;
        }
        else if (e.keyCode == 40 && direction!= 'up') {
            direction = 'down';
            steps = false;
        }
    }
    
});