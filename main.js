const colorPicker = document.querySelector('#colorPicker')
const brushWidth = document.querySelector('#brushWidth')
const container = document.querySelector('.container')
const clearButton = document.querySelector('#clear')
const canvas = document.querySelector("#canvas")
const rect = canvas.getBoundingClientRect()
const buttons = document.querySelectorAll('.color_picker button')
console.log(rect)

// canvas.width = window.innerWidth 
// canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.lineCap = "round"

let isMouseDown = false
let previous = {
    x: 0,
    y: 0
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        context.strokeStyle = e.currentTarget.dataset.color
    })
}, false)

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

canvas.addEventListener("mousemove", event => {
    if (isMouseDown) {
        let {
            pageX: x,
            pageY: y
        } = event
        context.beginPath()
        context.moveTo(previous.x, previous.y)
        context.lineWidth = brushWidth.value.toString()
        context.lineTo(x, y)
        context.stroke()

        previous = {
            x: event.pageX,
            y: event.pageY
        }
    }
}, false)

canvas.addEventListener("mousedown", event => {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
    previous = {
        x: event.pageX,
        y: event.pageY
    }
    isMouseDown = true
}, false)

canvas.addEventListener("mouseup", () => {
    isMouseDown = false
}, false)

clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}, false)