const dropDownMenu = document.querySelectorAll('[data-dropdown]')

dropDownMenu.forEach((e)=>{
    e.addEventListener('click', handleClick)
    e.addEventListener('touchstart', handleClick)
})

function handleClick(e){
    this.classList.add('ativo')
    clickOutside(this, (e)=>{
        this.classList.remove('ativo')
    })
}

function clickOutside(element, callback){
    const html = document.documentElement
    const dataOutside = 'data-outside'
    if(!element.hasAttribute(dataOutside)){
        element.setAttribute(dataOutside, '')
    }

    html.addEventListener('click', handleOutsideClick)
    html.addEventListener('touchstart', handleOutsideClick)

    function handleOutsideClick(event){
        if(!element.contains(event.target)){
            html.removeEventListener('click', handleOutsideClick)
            html.removeEventListener('touchstart', handleOutsideClick)
            callback()
            element.removeAttribute(dataOutside)
        }
    }
}