const colorPicker = document.querySelector('#colorPicker')
const brushWidth = document.querySelector('#brushWidth')
const container = document.querySelector('.container')
const clearButton = document.querySelector('#clear')
const canvas = document.querySelector("#canvas")

// canvas.width = window.innerWidth 
// canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.lineCap = "round"

let isMouseDown = false
let previous = {
    x: 0,
    y: 0
}
const buttons = document.querySelectorAll('.color_picker button')

for (btn of buttons) {
    btn.addEventListener('click', (e) => {
        console.log(e.currentTarget.dataset.color)
        context.strokeStyle = e.currentTarget.dataset.color
    })
}

canvas.addEventListener("mousemove", event => {
    if (isMouseDown) {

        let {
            pageX: x,
            pageY: y
        } = event
        context.beginPath()
        context.moveTo(previous.x, previous.y)
        context.lineWidth = `${brushWidth.value}`
        context.lineTo(x, y)
        context.stroke()

        previous = {
            x,
            y
        }
    }
})

canvas.addEventListener("mousedown", event => {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
    let {
        pageX: x,
        pageY: y
    } = event
    previous = {
        x,
        y
    }

    isMouseDown = true
})

canvas.addEventListener("mouseup", () => {
    isMouseDown = false
})

clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
})