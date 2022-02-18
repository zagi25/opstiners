import { useRef, useEffect, useState } from 'react';

const Popup = ({ pos, show }) => {
  const popRef = useRef();


  useEffect(() => {
    if(show){
      popRef.current.style.display = 'block';
      popRef.current.style.left = pos.x - popRef.current.offsetWidth + 'px';
      popRef.current.style.top = 
        pos.y - 50 > 0 ? pos.y - 60 + 'px' : pos.y + 20 + 'px';
    }else{
      popRef.current.style.display = 'none';
    }
  },[pos]);

  return(
    <div ref={popRef} className = 'popup'>
      <h1>{pos.name}</h1>
    </div>
  );
};

export default Popup;
