import React from 'react';
import './StrokeSelector.css';
import { strokeSize } from './../../constants';

function StrokeSelector(props) {
  return (
    <div className={`toolbar-strokeSelector`}>
       { strokeSize.map(size => {
         return (
           <div
             key={size}
             onTouchStart={(evt) => {
               evt.stopPropagation();
               props.callback({width: size})
             }}
             onClick={(evt) => {
               evt.stopPropagation();
               props.callback({width: size})
             }}
             style={{ width: size + 6, height: size + 6, background: `${props.currentWidth == size ? '#666666':'#E9E9E9'}`}}
           ></div>
         )
       })}
    </div>
  )
}


export default StrokeSelector;
