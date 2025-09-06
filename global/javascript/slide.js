const slide = document.querySelector('.servicos ul');
const wrapper = document.querySelector('.servicos');
const dist = {finalPosition: 0, startX: 0, movement: 0}

function onStart(event){
    transition(false)
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
    transition(true)
    changeSlideOnEnd()
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
let indice = {
    prev: 0,
    active: 1,
    next: 1,
}

function changeSlideOnEnd(){
    if(dist.movement>30 && indice.next !== undefined){
        activeNextSlide()
    } else if(dist.movement < -30 && indice.prev !== undefined){
        activePrevSlide()
    } else{
        changeSlide(indice.active)
    }
}

function slidePosition(slide){
    const margin = (wrapper.offsetWidth - slide.offsetWidth)/2
    return -(slide.offsetLeft-margin)
}

let slideArray
function slidesConfig(){
    slideArray = [...slide.children].map((element)=>{
        const position = slidePosition(element)
        return {
            position, 
            element
        }
    })
}

function changeSlide(index){
    moveSlide(slideArray[index].position)
    slideIndexNav(index)
    dist.finalPosition = slideArray[index].position
}

function slideIndexNav(index){
    const last = slideArray.length - 1
    indice = {
        prev: index ? index - 1 : undefined,
        active: index,
        next: index === last ? undefined : index + 1,
    }
}

function activePrevSlide(){
    if(indice.prev !== undefined){
        changeSlide(indice.prev)
    }

}
function activeNextSlide(){
    if(indice.next !== undefined){
        changeSlide(indice.next)
    }
}

function transition(ativo){
    slide.style.transition = ativo ? 'transform .3s' : ''
}

slidesConfig()
// changeSlide(5)
// activeNextSlide()

wrapper.addEventListener('mousedown', onStart)
wrapper.addEventListener('touchstart', onStart)
wrapper.addEventListener('mouseup', onEnd)
wrapper.addEventListener('touchend', onEnd)