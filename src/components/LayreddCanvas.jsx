// components/LayeredCanvas.js
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Stage = dynamic(() => import('react-konva').then(mod => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then(mod => mod.Layer), { ssr: false });
const KonvaImage = dynamic(() => import('react-konva').then(mod => mod.Image), { ssr: false });

const LayeredCanvas = ({ layers }) => {
  const [scale, setScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // Default dimensions
  const stageRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    setScale(newScale);
    setStagePosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      scaleX={scale}
      scaleY={scale}
      x={stagePosition.x}
      y={stagePosition.y}
      draggable
      onWheel={handleWheel}
      ref={stageRef}
    >
      {layers.map((layer, index) => (
        <Layer key={index} draggable>
          <KonvaImage
            image={layer.image}
            x={layer.x}
            y={layer.y}
            draggable
          />
        </Layer>
      ))}
    </Stage>
  );
};

export default LayeredCanvas;
