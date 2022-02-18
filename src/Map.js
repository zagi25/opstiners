import { useRef, useEffect, useState } from "react";
import Svg from './components/Svg';
import Popup from './components/Popup';
import Info from './components/Info';
import opstine_imena from './opstine_imena';

function Map() {
   const [clicked, setClicked] = useState(false);
   const [clickedId, setClickedId] = useState('');
   const [opstine, setOpstine] = useState({});
   const [popup, setPopup] = useState({});
   const [showPopup, setShowPopup] = useState(false);

   const mapRef = useRef(null);
   const primaryColor = '#f5ba8e';
   const highlightColor = '#ff9e54';


   useEffect(() => {
      setOpstine(mapRef.current.childNodes[0].childNodes[0].childNodes);
   },[]);

   const highlight = (e) => {
      if(e.type === 'click' && e.target.nodeName === 'path'){
         setClicked(true);
      }
      if(e.type === 'mouseenter'){
         let formated_name = e.target.id.replace(/_/g, ' ');
         setShowPopup(true);
         setPopup({
            x: e.clientX,
            y: e.clientY,
            name: formated_name === 'Kosovo' ? 
            'Косово' : opstine_imena[formated_name],
         });
         if(e.target.nodeName === 'path'){
            opstine.forEach((opstina) => {
              opstina.style.fill = opstina.id === clickedId ? 
                  highlightColor
                  :
                  primaryColor;
            });
            e.target.style.fill = highlightColor;
         }
      }else if(e.type === 'click'){
         if(e.target.nodeName === 'path'){
            if(e.target.id !== clickedId){
               setClickedId(e.target.id);
               opstine.forEach((opstina) => {
                 opstina.style.fill = primaryColor;
               });
               e.target.style.fill = highlightColor;
            }else{
               e.target.style.fill = primaryColor;
               setClicked(false);
               setClickedId('');
            }
         }
      }
   }

   const highlight_out = (e) => {
      if(e){
         setShowPopup(false);
         setPopup({});
         e.target.style.fill = primaryColor
      }
   }

   return (
      <div className = 'map-section'>
         <Popup pos={popup} show={showPopup} />
         <div className = 'info-container'>
            <Info ime_opstine = {clickedId} clicked = {clicked} />
         </div>
         <div className = 'svg-map'>
            <svg
               ref = {mapRef}
               version="1.1"
               height='750'
               width='765'
               viewBox="90 -10 800 765"
               id="svg1427"
               xmlns="http://www.w3.org/2000/svg"
               onClick = {(e) => highlight(e)}
            >
               <Svg 
                  highlight = { highlight }
                  highlight_out = { highlight_out }
               />
             </svg>
         </div>
      </div>
  );
}

export default Map;
