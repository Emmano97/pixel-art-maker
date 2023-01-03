//imports useful elements, and assigns them to variables
const canvas = document.getElementById("pixelCanvas");
const color = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");
const height = document.getElementById("inputHeight");
const width = document.getElementById("inputWidth");
const fillBtn = document.querySelector('#fill');
const eraseBtn = document.querySelector('#erase');
const drawBtn = document.querySelector('#draw');

// When size is submitted by the user, call makeGrid()
//function to create grid and assign event listeners to all cells on creation
function makeGrid(height, width) {
    for (let y = 0; y < height; y++) {
        let row = canvas.insertRow(y);
        for (let x = 0; x < width; x++) {
            let cell = row.insertCell(x);
            cell.addEventListener("mousedown", function (event) {
                cell.style.backgroundColor = color.value;
                cell.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    cell.style.backgroundColor = "white";
                })
            })
        }
    }
}

// A create a default sized panel
makeGrid(16, 16)


//function that uses the size picker submit to call makeGrid() funtion
sizePicker.addEventListener("submit", function (event) {
    event.preventDefault();
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    }
    makeGrid(height.value, width.value);
});

// check if the mouse pointer is pressed
let drawingDown = false;

canvas.addEventListener('mousedown', function (e) {
    drawingDown = true;
    canvas.addEventListener('mouseup', function () {
        drawingDown = false;
    });
    canvas.addEventListener('mouseleave', function () {
        drawingDown = false;
    });
    canvas.addEventListener('mouseover', function (e) {
        if (drawingDown) {
            if (e.target.tagName === 'TD') {
                e.target.style.backgroundColor = color.value;
            }
        }
    });
});

fillBtn.addEventListener('click', function (e) {
    e.preventDefault();
    canvas.set
    canvas.querySelectorAll('td').forEach(td => td.style.backgroundColor = color.value);
});

eraseBtn.addEventListener('click', function () {
    // Enables drag erasing while in erase mode
    canvas.addEventListener('mousedown', function (e) {
        drawingDown = true;
        canvas.addEventListener('mouseup', function () {
            drawingDown = false;
        });
        // Ensures cells won't be erased if grid is left while pointer is held down
        canvas.addEventListener('mouseleave', function () {
            drawingDown = false;
        });
        canvas.addEventListener('mouseover', function (e) {
            // While mouse pointer is pressed and within grid boundaries, empties cell contents. Inner if statement fixes bug that fills in entire grid
            if (drawingDown) {
                if (e.target.tagName === 'TD') {
                    e.target.style.backgroundColor = null;
                }
            }
        });
    });
    // Enables single cell erase while in erase mode
    canvas.addEventListener('mousedown', function (e) {
        e.target.style.backgroundColor = null;
    });
});

drawBtn.addEventListener('click', function () {
    canvas.addEventListener('mousedown', function (e) {
        drawingDown = true;
        canvas.addEventListener('mouseup', function () {
            drawingDown = false;
        });

        canvas.addEventListener('mouseleave', function () {
            drawingDown = false;
        });
        canvas.addEventListener('mouseover', function (e) {
            if (drawingDown) {
                if (e.target.tagName === 'TD') {
                    e.target.style.backgroundColor = color.value;
                }
            }
        });
    });

    canvas.addEventListener('mousedown', function (e) {
        if (e.target.tagName !== 'TD') return;
        e.target.style.backgroundColor = color.value;
    });
});