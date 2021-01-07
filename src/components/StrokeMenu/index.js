import React from 'react';
import './StrokeMenu.css';
import ColorPalette from './../ColorPalette';
import StrokeSelector from './../StrokeSelector';

function StrokeMenu(props) {
  return (
    <div className={`toolbar-strokeMenu`}>
      {
        props.showMenu
        ? <div className={`toolbar-colorAndSize`}>
            {
              props.showWidthPicker
              ? <React.Fragment>
                  <StrokeSelector
                     currentWidth={props.currentWidth}
                     callback={props.callback}
                  />
                  <div className={`toolbar-split`}></div>
                </React.Fragment>
               : null
            }
            <ColorPalette
               currentColor={props.currentColor}
               callback={props.callback}
            />
          </div>
        : null
      }
     </div>
  )
}


export default StrokeMenu;
