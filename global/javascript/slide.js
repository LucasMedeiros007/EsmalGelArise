alert(
  'ATENÇÃO! Site ainda em desenvolvimento. O site foi pensado para o público mobile',
);
if (window.innerWidth <= 500) {
  teste();
} else {
  const slide = document.querySelector('.servicos ul');
  slide.style.overflowX = 'auto';
  slide.style.paddingRight = '40px';
  slide.style.paddingLeft = '40px';
}
function teste() {
  if (window.innerWidth <= 500) {
    const slide = document.querySelector('.servicos ul');
    const wrapper = document.querySelector('.servicos');
    const dist = { finalPosition: 0, startX: 0, movement: 0 };
    let contador = 0;
    let indice = {
      prev: 0,
      active: 1,
      next: 1,
    };

    let tempo5;
    function onStart(event) {
      transition(false);
      let typeMove;
      if (event.type === 'mousedown') {
        event.preventDefault();
        dist.startX = event.clientX;
        typeMove = 'mousemove';
      } else {
        dist.startX = event.changedTouches[0].clientX;
        typeMove = 'touchmove';
      }
      wrapper.addEventListener(typeMove, onMove);
    }

    function onMove(event) {
      const pointerPosition =
        event.type === 'mousemove'
          ? event.clientX
          : event.changedTouches[0].clientX;
      const posicaoFinal = updatePosition(pointerPosition);
      moveSlide(posicaoFinal);
    }

    function onEnd(event) {
      const moveType = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
      wrapper.removeEventListener(moveType, onMove);
      dist.finalPosition = dist.movePosition;
      transition(true);
      changeSlideOnEnd();

      contador = indice.active;
    }

    function updatePosition(clientX) {
      dist.movement = dist.startX - clientX;
      return dist.finalPosition - dist.movement;
    }

    function moveSlide(distX) {
      slide.style.transform = `translate3d(${distX}px,0,0)`;
      dist.movePosition = distX;
    }

    //slidesconfig
    function changeSlideOnEnd() {
      if (dist.movement > 30 && indice.next !== undefined) {
        activeNextSlide();
      } else if (dist.movement < -30 && indice.prev !== undefined) {
        activePrevSlide();
      } else {
        changeSlide(indice.active);
      }
    }

    function slidePosition(slide) {
      const margin = (wrapper.offsetWidth - slide.offsetWidth) / 2;
      return -(slide.offsetLeft - margin);
    }

    let slideArray;
    function slidesConfig() {
      slideArray = [...slide.children].map((element) => {
        const position = slidePosition(element);
        return {
          position,
          element,
        };
      });
    }

    function changeSlide(index) {
      moveSlide(slideArray[index].position);
      slideIndexNav(index);
      dist.finalPosition = slideArray[index].position;
    }

    function slideIndexNav(index) {
      const last = slideArray.length - 1;
      indice = {
        prev: index ? index - 1 : undefined,
        active: index,
        next: index === last ? undefined : index + 1,
      };
    }

    function activePrevSlide() {
      if (indice.prev !== undefined) {
        changeSlide(indice.prev);
      }
    }
    function activeNextSlide() {
      if (indice.next !== undefined) {
        changeSlide(indice.next);
      }
    }

    function transition(ativo, trans = '.3s') {
      slide.style.transition = ativo ? 'transform ' + trans : '';
    }

    function onResize() {
      setTimeout(() => {
        slidesConfig();
        changeSlide(indice.active);
      }, 100);
    }

    window.addEventListener('resize', onResize);

    slidesConfig();

    wrapper.addEventListener('mousedown', onStart);
    wrapper.addEventListener('touchstart', onStart);
    wrapper.addEventListener('mouseup', onEnd);
    wrapper.addEventListener('touchend', onEnd);

    //   let intervaloSemTocar;
    //   function iniciarIntervalo() {
    //     intervaloSemTocar = setInterval(intervalo, 2550);
    //   }
    // iniciarIntervalo();
    //   function intervalo() {
    //     contador++;
    //     if (contador <= slideArray.length - 1) {
    //       transition(true, '0.7s');
    //       changeSlide((indice.prev = contador));
    //     } else {
    //       transition(true, '1.3s');
    //       changeSlide((indice.active = 0));
    //       contador = 0;
    //     }
    //   }
  }
}

window.addEventListener('resize', teste);
