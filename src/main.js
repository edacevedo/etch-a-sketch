window.onload = () => {
    let mainContainer = document.querySelector('#main-container'),
        gridSize = 16,
        childItem,
        minWidth = Math.round(100/gridSize);
    
    for (let index = 0; index < gridSize*gridSize; index++) {
        childItem = document.createElement('div');
        childItem.style.minWidth = `${minWidth}%`;
        mainContainer.append(childItem);
    }
}

document.addEventListener('mouseover', (event) => {
    console.log(event)
});