import React from 'react';
import './ColorPalette.css';
import { strokeColor } from './../../constants';

function ColorPalette(props) {
  return (
    <div className={`toolbar-palette`}>
      { strokeColor.map(color => {
        return <div
          className={`toolbar-color ${props.currentColor === color ? 'color-select':''}`}
          key={color}
          onTouchStart={(evt) => {
            evt.stopPropagation();
            props.callback({color: color})
          }}
          onClick={(evt) => {
            evt.stopPropagation();
            props.callback({color: color})
          }}
        >
          <div className={`toolbar-fill`} style={{ background: color }}></div>
        </div>
      })}
    </div>
  )
}

export default ColorPalette;
