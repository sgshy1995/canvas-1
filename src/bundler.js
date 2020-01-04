var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

var last = []
var painting = false

const ifInTouch = "ontouchstart" in document

ctx.fillStyle = 'black'
ctx.strokeStyle = 'black'
ctx.lineWidth = 20
ctx.lineCap = 'round'

if (!ifInTouch) {
    canvas.onmousedown = () => {
        painting = true
    }
    canvas.onmousemove = (e) => {
        if (painting) {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
    }
    canvas.onmouseup = () => {
        painting = false
        last = []
    }
} else if (ifInTouch) {
    canvas.ontouchmove = (e) => {
        drawLine(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY)
        last = [e.touches[0].clientX, e.touches[0].clientY]
    }
    canvas.ontouchend = () => {
        last = []
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}