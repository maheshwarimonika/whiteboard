import React from 'react';
import './ToolBar.css';

function ToolBar(props) {
  return (
    <div className="drawing-board-toolbar-container">
      {
        props.toolbar.map(tool => {
          return (
            <div key={tool.type} className={`drawing-board-toolbar-icon ${tool.type === props.type ? "icon-select": ""}`}>
              <span className="toolbar-iconLabel" onClick={() => props.setProperties(tool)}> <i title={tool.text} className={`fa ${tool.icon} fa-2x`} aria-hidden="true"></i></span>
            </div>
          )
        })
      }
    </div>
  )
}

export default ToolBar;
