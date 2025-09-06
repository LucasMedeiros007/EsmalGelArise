const slide = document.querySelector('.servicos ul');
const wrapper = document.querySelector('.servicos');
const dist = {finalPosition: 0, startX: 0, movement: 0}

function onStart(event){
    let typeMove
    if(event.type === 'mousedown'){
        event.preventDefault()
        dist.startX = event.clientX
        typeMove = 'mousemove'
    } else{
        dist.startX = event.changedTouches[0].clientX
        typeMove = 'touchmove'
    }
    wrapper.addEventListener(typeMove, onMove)
}

function onMove(event){
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const posicaoFinal = updatePosition(pointerPosition)
    moveSlide(posicaoFinal)
}

function onEnd(event){
    const moveType = (event.type === 'mouseup')? 'mousemove' : 'touchmove'
    wrapper.removeEventListener(moveType, onMove)
    dist.finalPosition = dist.movePosition
}

function updatePosition(clientX){
    dist.movement = dist.startX - clientX
    return dist.finalPosition - dist.movement
}

function moveSlide(distX){
    slide.style.transform = `translate3d(${distX}px,0,0)`
    dist.movePosition = distX
}

//slidesconfig

function slidesConfig(){
    const slideArray = [...slide.children]
    console.log(slideArray)
}

slidesConfig()

wrapper.addEventListener('mousedown', onStart)
wrapper.addEventListener('touchstart', onStart)
wrapper.addEventListener('mouseup', onEnd)
wrapper.addEventListener('touchend', onEnd)