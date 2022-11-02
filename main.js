const colorPicker = document.querySelector('.color_picker')
const brushWidth = document.getElementById('brushWidth')
const container = document.querySelector('.container')
const clearButton = document.getElementById('clear')
const canvas = document.getElementById('canvas')
// const rect = canvas.getBoundingClientRect()
const buttons = document.querySelectorAll('.color_picker button')
// console.log(rect)

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

let context = canvas.getContext('2d')

context.lineCap = 'round'

let isMouseDown = false
let previous = {
  x: 0,
  y: 0
}

buttons.forEach(button => {
  button.addEventListener('click', e => {
    context.strokeStyle = e.currentTarget.dataset.color
  })
}, false)

window.addEventListener('resize', resizeCanvas, false)

function resizeCanvas () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

canvas.addEventListener(
  'mousemove',
  event => {
    if (isMouseDown) {
      let { pageX: x, pageY: y } = event
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
  },
  false
)

canvas.addEventListener(
  'mousedown',
  event => {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`)
    previous = {
      x: event.pageX,
      y: event.pageY
    }
    isMouseDown = true
  },
  false
)

canvas.addEventListener(
  'mouseup',
  () => {
    isMouseDown = false
  },
  false
)

clearButton.addEventListener(
  'click',
  () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  },
  false
)

// validation max input value

brushWidth.addEventListener('input', e => {
  const el = e.target || e

  if (el.type == 'number' && el.max && el.min) {
    let value = parseInt(el.value)
    let max = parseInt(el.max)
    let min = parseInt(el.min)
    if (value > max) el.value = el.max
    if (value < min) el.value = el.min
  }
})
