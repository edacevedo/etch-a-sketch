window.onload = () => {  
    paintDash(16);
    document.querySelector('#clear-btn').addEventListener('click', onClear);
}

let paintDash = (gridSize) => {
    let mainContainer = document.querySelector('#main-container'),
        childItem,
        minWidth = Math.round(100/gridSize);
    
        mainContainer.innerHTML = '';

    for (let index = 1; index < gridSize*gridSize; index++) {
        childItem = document.createElement('div');
        childItem.style.minWidth = `${minWidth}%`;
        childItem.addEventListener('mouseover', onMouseOverChildItem);
        mainContainer.append(childItem);
    }
}

let onMouseOverChildItem = (event) => {
    let childItem = event.target,
        currentTone = childItem.currentTone;

    currentTone = currentTone === 0 ? currentTone : (currentTone || 220) - 20;
    childItem.style.backgroundColor = `RGB(${currentTone}, ${currentTone}, ${currentTone})`;
    childItem.currentTone = currentTone;
};

let onClear = () => {
    let gridSize = window.prompt('Which will be the panel size? (e.g. 16)');
    
    gridSize = Number.parseInt(gridSize);

    if (gridSize < 16 || gridSize > 100) {
        gridSize = 32
    }

    if (gridSize) {
        paintDash(gridSize);
    }
}