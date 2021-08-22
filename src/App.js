import './App.css';
import Lines from './draw_line'
import bg from './pink_bg.png'
import React, { useState, useEffect } from 'react';

function App() {
  const [firstPoint, setFirstPoint] = useState([]);
  const [secondPoint, setSecondPoint] = useState([]);
  const [movingPoint, setMovingPoint] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  
  const resetPointsList = () => {
    setFirstPoint([]);
    setSecondPoint([]);
  }

  useEffect(() => {
    function relativeCoords ( event ) {
      event.preventDefault();
      var bounds = event.target.getBoundingClientRect();
      var x = event.clientX - bounds.left;
      var y = event.clientY - bounds.top;
      x = Math.round(x);
      y = Math.round(y);
      return {x, y};
    }

    const firstCoord = (event) => {
      var {x, y} = relativeCoords(event);
      setMouseDown(true);
      // setFirstPoint(firstPoint => ([...firstPoint, x ,y]));
      setFirstPoint([x ,y]);
      setSecondPoint([x ,y]);
    };

    const secondCoord = (event) => {
      // if (mouseDown) {
        var {x, y} = relativeCoords(event);
        setSecondPoint(secondPoint => ([...secondPoint, x ,y]));
        setSecondPoint([x ,y]);
        setMouseDown(false);
      // }
    };

    const dragLine = (event) => {
        var {x, y} = relativeCoords(event);
        setMovingPoint([x,y]);
    }

    var elem = document.getElementById("container");
    elem.addEventListener("mousedown", firstCoord, false);
    elem.addEventListener("mouseup", secondCoord, false);
    elem.addEventListener("mousemove", dragLine, false);
    return () => {
        elem.removeEventListener("mousedown", firstCoord);
        elem.removeEventListener("mouseup", secondCoord);
        elem.removeEventListener("mousemove", dragLine);
    };
  }, []);


  return (
    <div>
      <h1>drag a line</h1>
        <div className="all-wrapper" id="container">
          <div className="bg-wrapper">
            <img className="bg" src={bg}  alt="bg" />
          </div>
            <Lines firstPoint={firstPoint} secondPoint={secondPoint} movingPoint={movingPoint} mouseDown={mouseDown} />
        </div>
      <div className="btn-center">
        <button onClick={resetPointsList}>Reset</button>
      </div>
    </div>
  );
}

export default App;
