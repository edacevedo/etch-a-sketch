const SIZES = [
    25,
    50,
    75,
    100
]

const SHAPES = [
    'color',
    'shading',
    'random'
]

let currentSize = 0;
let currentShape = 0;

window.onload = () => {  
    paintDash(SIZES[currentSize]);
    document.querySelector('#resize-btn').addEventListener('click', onResize);
    document.querySelector('#shape-btn').addEventListener('click', onChangeShape);
}

let paintDash = (gridSize) => {
    let mainContainer = document.querySelector('#dash'),
        childItem,
        minWidth = 100/gridSize;
    
        mainContainer.innerHTML = '';

    for (let index = 0; index < gridSize*gridSize; index++) {
        childItem = document.createElement('div');
        childItem.style.minWidth = `${minWidth}%`;
        childItem.style.minHeight = `${minWidth}%`;
        childItem.addEventListener('mouseover', onMouseOverChildItem);
        mainContainer.append(childItem);
    }
}

let onMouseOverChildItem = (event) => {
    let childItem = event.target,
        currentTone = childItem.currentTone,
        colorInput = document.querySelector('#color-input');

    switch (currentShape) {
        case 0:
            childItem.style.backgroundColor = colorInput.value;
            break;
        case 1:
            currentTone = currentTone === 0 ? currentTone : (currentTone || 220) - 20;
            childItem.style.backgroundColor = `RGB(${currentTone}, ${currentTone}, ${currentTone})`;
            childItem.currentTone = currentTone;
            break;
        case 2:
            childItem.style.backgroundColor = `RGB(${randomColor()}, ${randomColor()}, ${randomColor()})`;
            break;    
        default:
            break;
    }
};

let onResize = (event) => {
    document.querySelector('#resize-btn').removeEventListener('click', onResize);

    let resizeButton = event.target,
        currentPosition = resizeButton.currentPosition || 0,
        indicator = document.querySelector('#resize-indicator');
    
    currentPosition = currentPosition === 270 ? 0 : currentPosition + 90;

    currentSize = currentSize === 3 ? 0 : currentSize + 1;
    paintDash(SIZES[currentSize]);

    indicator.style.transform = `rotate(${currentPosition}deg)`;
    resizeButton.currentPosition = currentPosition;

    indicator.addEventListener('transitionend', ()=> {
        document.querySelector('#resize-btn').addEventListener('click', onResize)
    });
}

let onChangeShape = (event) => {
    let shapeButton = event.target,
        currentPosition = shapeButton.currentPosition || 0,
        indicator = document.querySelector('#shape-indicator');
    
    if (event.target.id != 'shape-btn' && event.target.id != 'shape-indicator') {
        return;
    }
    document.querySelector('#shape-btn').removeEventListener('click', onChangeShape);
    
    currentPosition = currentPosition === 180 ? 0 : currentPosition + 90;
    indicator.style.transform = `rotate(${currentPosition}deg)`;

    currentShape = currentShape === 2 ? 0 : currentShape + 1;
    shapeButton.currentPosition = currentPosition;

    indicator.addEventListener('transitionend', () =>{
        document.querySelector('#shape-btn').addEventListener('click', onChangeShape);
    });
}

let randomColor = () =>  Math.round(Math.random() * 255);
