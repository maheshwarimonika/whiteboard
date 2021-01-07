import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import StrokeMenu from './components/StrokeMenu';
import ToolBar from './components/ToolBar';
import { toolbar } from './constants';

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [currentType, setCurrentType] = useState(toolbar[0])
  const [selectedColor, setSelectedColor] = useState(toolbar[0].color)
  const [selectedWidth, setSelectedWidth] = useState(toolbar[0].width)
  const [showMenu, setMenu] = useState(toolbar[0].showMenu);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round";
    contextRef.current = context;
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.globalAlpha = currentType.opacity;
    context.strokeStyle = currentType.color;
    context.lineWidth = currentType.width;
    contextRef.current = context;
  }, [currentType])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
   contextRef.current.closePath()
   setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    if(contextRef.current.globalAlpha < 1) {
      contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    }
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <React.Fragment>
      <ToolBar
        type={currentType.type}
        toolbar={toolbar}
        setProperties={(data) => {
          setCurrentType({...data, color: data.showMenu ? selectedColor: data.color , width: data.showWidthPicker ? selectedWidth: data.width })
          setMenu(data.showMenu)
        }}
      />
      <StrokeMenu
        currentWidth={currentType.width}
        currentColor={currentType.color}
        showWidthPicker={currentType.showWidthPicker}
        showMenu={showMenu}
        callback={(data) => {
          setCurrentType({...currentType, ...data})
          data.color && setSelectedColor(data.color)
          data.width && setSelectedWidth(data.width)
        }}
      />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </React.Fragment>
  );
}

export default App;
