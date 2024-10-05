//@ts-nocheck
"use client";
import { useRef, useEffect, useState } from "react";
import Toolbar from "./Toolbar";
const colors = [
  "#F9A1BC",
  "#4A90E2",
  "#A4E5D9",
  "#FC814A",
  "#C7A3E8",
  "#F4D35E",
  "#B39BC8",
  "#FF6F61",
  "#30D5C8",
  "#F4978E",
  "#BFD7ED",
  "#FAD4C0",
  "#3AAFA9",
  "#F5CBA7",
  "#E0FFFF",
  "#9FD3C7",
  "#9C1C3B",
  "#818F54",
  "#87CEEB",
  "#FFFACD",
];

const InfiniteCanvas = () => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(translateX, translateY);
      ctx.scale(scale, scale);

      // Example drawing: An infinite grid
      const gridSize = 50;
      const width = canvas.width;
      const height = canvas.height;

      // Calculate the top-left corner of the grid to start drawing
      const startX = Math.floor(-translateX / scale / gridSize) * gridSize;
      const startY = Math.floor(-translateY / scale / gridSize) * gridSize;

      for (
        let x = startX;
        x < width / scale - translateX / scale;
        x += gridSize
      ) {
        for (
          let y = startY;
          y < height / scale - translateY / scale;
          y += gridSize
        ) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // Draw added items
      items.forEach((item) => {
        if (item.type === "rectangle") {
          ctx.fillStyle = colors[item.color];
          ctx.fillRect(item.x, item.y, 100, 50);
        } else if (item.type === "circle") {
          ctx.fillStyle = colors[item.color];
          ctx.beginPath();
          ctx.arc(item.x, item.y, 50, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      ctx.restore();
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scale, translateX, translateY, items]);

  const handleWheel = (event) => {
    event.preventDefault();
    const zoomIntensity = 0.1;
    const mouseX = event.clientX - canvasRef.current.offsetLeft;
    const mouseY = event.clientY - canvasRef.current.offsetTop;
    const zoomFactor = 1 + event.deltaY * -zoomIntensity;

    const newScale = Math.min(Math.max(0.5, scale * zoomFactor), 2); // Limit zoom scale

    setTranslateX(translateX - (mouseX / scale) * (newScale - scale));
    setTranslateY(translateY - (mouseY / scale) * (newScale - scale));
    setScale(newScale);
  };

  const handleMouseDown = (event) => {
    setIsPanning(true);
    setStartX(event.clientX - translateX);
    setStartY(event.clientY - translateY);
  };

  const handleMouseMove = (event) => {
    if (!isPanning) return;
    setTranslateX(event.clientX - startX);
    setTranslateY(event.clientY - startY);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };

  const addItem = (type: any) => {
    const newItem = {
      type,
      x: (canvasRef.current.width / 2 - translateX) / scale,
      y: (canvasRef.current.height / 2 - translateY) / scale,
      color: Math.floor(Math.random() * (20 - 1) + 1),
    };
    setItems([...items, newItem]);
  };

  const handleDelete = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <Toolbar addItem={addItem} />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <canvas
          ref={canvasRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        <div className="w-full absolute bottom-[200px] flex items-center">
          <button onClick={handleDelete}>Clear</button>
        </div>
        <div className="text-center fixed bottom-0 left-4 right-4 z-10 bg-gray-100 p-2 rounded shadow">
          Zoom: {(scale * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default InfiniteCanvas;
