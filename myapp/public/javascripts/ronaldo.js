let movingImg=document.getElementById('rotate')
isMoving=true;
document.addEventListener('keydown', function(event) {
    if(event.code=='Space'){
      if (isMoving) {
        movingImg.style.animationPlayState = 'paused';
        isMoving = false;
      } else {
        movingImg.style.animationPlayState = 'running';
        isMoving = true;
      }
    }
  }); 