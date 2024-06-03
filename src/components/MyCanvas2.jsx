
// import { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import styles from "./MyCanvas2.module.css";

// const MyCanvas = () => {
//   const canvasRef1 = useRef(null);
//   const canvasRef2 = useRef(null);
//   const fabricCanvasRef1 = useRef(null);
//   const fabricCanvasRef2 = useRef(null);
//   const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

//   useEffect(() => {
//     const canvasElement1 = canvasRef1.current;
//     const canvasElement2 = canvasRef2.current;
//     if (!canvasElement1 || !canvasElement2) return;

//     const canvas1 = new fabric.Canvas(canvasElement1);
//     const canvas2 = new fabric.Canvas(canvasElement2);
//     fabricCanvasRef1.current = canvas1;
//     fabricCanvasRef2.current = canvas2;

//     const resizeCanvas = () => {
//       const container1 = canvasElement1.parentNode;
//       const container2 = canvasElement2.parentNode;
//       if (container1 && container2) {
//         const containerWidth1 = container1.clientWidth;
//         const containerHeight1 = container1.clientHeight;
//         const containerWidth2 = container2.clientWidth;
//         const containerHeight2 = container2.clientHeight;

//         canvas1.setDimensions({
//           width: containerWidth1,
//           height: containerHeight1,
//         });
//         canvas2.setDimensions({
//           width: containerWidth2,
//           height: containerHeight2,
//         });

//         canvas1.renderAll();
//         canvas2.renderAll();
//       }
//     };

//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();

//     setIsCanvasInitialized(true);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       canvas1.dispose();
//       canvas2.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (!isCanvasInitialized) return;

//     const canvas1 = fabricCanvasRef1.current;
//     const canvas2 = fabricCanvasRef2.current;
//     if (!canvas1 || !canvas2) return;

//     const setBackgroundImage = (canvas, url) => {
//       fabric.Image.fromURL(url, (img) => {
//         img.set({ left: 0, top: 0, originX: 'left', originY: 'top', selectable: false });
//         const scaleX = canvas.width / img.width;
//         const scaleY = canvas.height / img.height;
//         const scale = Math.max(scaleX, scaleY);
//         img.scale(scale);
//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//       });
//     };

//     setBackgroundImage(canvas1, "/background.png");

//     const layers1 = [
//       { url: "/car.png", x: 0, y: 0 },
//       { url: "/person.png", x: 20, y: 50 },
//     ];

//     const layers2 = [
//       { url: "/guys.png", x: 40, y: 80 },
//       { url: "/cat.png", x: 150, y: 90 },
//     ];

//     const addLayer = (canvas, url, left, top) => {
//       fabric.Image.fromURL(url, (img) => {
//         img.set({ left, top, selectable: true });
//         img.on("mousedown", () => {
//           img.set("opacity", img.opacity === 1 ? 0.5 : 1);
//           canvas.renderAll();
//         });
//         img.on("scaling", () => {
//           console.log(`Image resized to: width = ${img.width * img.scaleX}, height = ${img.height * img.scaleY}`);
//           if (canvas === canvas2) {
//             const newWidth = img.width * img.scaleX;
//             const newHeight = img.height * img.scaleY;
//             canvas2.setDimensions({
//               width: newWidth,
//               height: newHeight,
//             });
//             canvas2.renderAll();
//           }
//         });
//         img.hoverCursor = "pointer";
//         canvas.add(img);
//       });
//     };

//     layers1.forEach((layer) => {
//       addLayer(canvas1, layer.url, layer.x, layer.y);
//     });

//     layers2.forEach((layer) => {
//       addLayer(canvas2, layer.url, layer.x, layer.y);
//     });
//   }, [isCanvasInitialized]);

//   return (
//     <div className={styles.Parent1} id="test2">
//       <canvas ref={canvasRef1} className={styles.canvas} />
//       <canvas ref={canvasRef2} className={styles.canvas2} />
//     </div>
//   );
// };

// export default MyCanvas;


import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "./MyCanvas2.module.css";

const MyCanvas = () => {
  const canvasRef1 = useRef(null);
  const fabricCanvasRef1 = useRef(null);
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

  useEffect(() => {
    const canvasElement1 = canvasRef1.current;
    if (!canvasElement1) return;

    const canvas1 = new fabric.Canvas(canvasElement1);
    fabricCanvasRef1.current = canvas1;

    const resizeCanvas = () => {
      const container1 = canvasElement1.parentNode;
      if (container1) {
        const containerWidth1 = container1.clientWidth;
        const containerHeight1 = container1.clientHeight;

        canvas1.setDimensions({
          width: containerWidth1,
          height: containerHeight1,
        });

        if (canvas1.backgroundImage) {
          const bgImage1 = canvas1.backgroundImage;
          bgImage1.scaleToWidth(containerWidth1);
          bgImage1.scaleToHeight(containerHeight1);
        }

        canvas1.renderAll();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    setIsCanvasInitialized(true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas1.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isCanvasInitialized) return;

    const canvas1 = fabricCanvasRef1.current;
    if (!canvas1) return;

    const setBackgroundImage = (canvas, url) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({ left: 0, top: 0, originX: 'left', originY: 'top', selectable: false });
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        img.scale(scale);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    };

    setBackgroundImage(canvas1, "/background.png");

    const layers = [
      { url: "/car.png", x: 0, y: 0 },
      { url: "/person.png", x: 20, y: 50 },
      { url: "/guys.png", x: 40, y: 80 },
      { url: "/cat.png", x: 150, y: 90 },
    ];

    const addLayer = (url, left, top) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({ left, top, selectable: true });
        img.on("mousedown", () => {
          img.set("opacity", img.opacity === 1 ? 0.5 : 1);
          canvas1.renderAll();
        });
        img.on("scaling", () => {
          console.log(`Image resized to: width = ${img.width * img.scaleX}, height = ${img.height * img.scaleY}`);
        });
        img.hoverCursor = "pointer";
        canvas1.add(img);
        canvas1.bringToFront(img);  // Make sure the image is brought to the front
      });
    };

    layers.forEach((layer) => {
      addLayer(layer.url, layer.x, layer.y);
    });
  }, [isCanvasInitialized]);

  return (
    <div className={styles.Parent1} id="test2">
      <canvas ref={canvasRef1} className={styles.canvas} />
    </div>
  );
};

export default MyCanvas;
