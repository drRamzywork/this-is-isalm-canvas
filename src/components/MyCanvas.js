// import { useEffect } from "react";
// import { fabric } from "fabric";
// import styles from "./MyCanvas.module.css";
// const MyCanvas = () => {
//   useEffect(() => {
//     const canvas = new fabric.Canvas("canvas-id");

//     // تعيين الصورة الخلفية
//     fabric.Image.fromURL("/background.png", (img) => {
//       img.set({ left: 0, top: 0, selectable: false });
//       canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//     });

//     const addLayer = (url, left, top) => {
//       fabric.Image.fromURL(url, (img) => {
//         img.set({ left, top, selectable: false });
//         img.on("mousedown", () => {
//           img.set("opacity", img.opacity === 1 ? 0.5 : 1);
//           canvas.renderAll();
//         });
//         img.hoverCursor = "pointer";

//         canvas.add(img);
//       });
//     };

//     fetch("/api/layers")
//       .then((response) => response.json())
//       .then((data) => {
//         data.forEach((layer) => {
//           addLayer(layer.url, layer.x, layer.y);
//         });
//       });
//   }, []);

//   return <canvas id="canvas-id" width={1800} height={600}></canvas>;
// };

// export default MyCanvas;

// import { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import styles from "./MyCanvas.module.css";

// const MyCanvas = () => {
//   const canvasRef = useRef(null);
//   const fabricCanvasRef = useRef(null);
//   const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

//   useEffect(() => {
//     const canvasElement = canvasRef.current;
//     if (!canvasElement) return;

//     const canvas = new fabric.Canvas(canvasElement);
//     fabricCanvasRef.current = canvas;

//     const resizeCanvas = () => {
//       const container = canvasElement.parentNode;
//       if (container) {
//         const containerAspectRatio =
//           container.clientWidth / container.clientHeight;
//         const canvasAspectRatio = canvas.width / canvas.height;

//         if (containerAspectRatio > canvasAspectRatio) {
//           canvas.setWidth(container.clientWidth);
//           canvas.setHeight(container.clientWidth / canvasAspectRatio);
//         } else {
//           canvas.setHeight(container.clientHeight);
//           canvas.setWidth(container.clientHeight * canvasAspectRatio);
//         }

//         canvas.renderAll();
//       }
//     };

//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();

//     setIsCanvasInitialized(true);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       canvas.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (!isCanvasInitialized) return;

//     const canvas = fabricCanvasRef.current;
//     if (!canvas) return;

//     const setBackgroundImage = () => {
//       fabric.Image.fromURL("/background.png", (img) => {
//         img.set({ left: 0, top: 0, selectable: false });
//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//       });
//     };

//     setBackgroundImage();

//     const addLayer = (url, left, top) => {
//       fabric.Image.fromURL(url, (img) => {
//         img.set({ left, top, selectable: false });
//         img.on("mousedown", () => {
//           img.set("opacity", img.opacity === 1 ? 0.5 : 1);
//           canvas.renderAll();
//         });
//         img.hoverCursor = "pointer";
//         canvas.add(img);
//       });
//     };

//     fetch("/api/layers")
//       .then((response) => response.json())
//       .then((data) => {
//         data.forEach((layer) => {
//           addLayer(layer.url, layer.x, layer.y);
//         });
//       });
//   }, [isCanvasInitialized]);

//   return (
//     <div className={styles.Parent1}>
//       <canvas ref={canvasRef} className={styles.canvas} />
//     </div>
//   );
// };

// export default MyCanvas;

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "./MyCanvas.module.css";

const MyCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvas = new fabric.Canvas(canvasElement);
    fabricCanvasRef.current = canvas;

    const resizeCanvas = () => {
      const container = canvasElement.parentNode;
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        canvas.setDimensions({
          width: containerWidth,
          height: containerHeight,
        });

        if (canvas.backgroundImage) {
          const bgImage = canvas.backgroundImage;
          bgImage.scaleToWidth(containerWidth);
          bgImage.scaleToHeight(containerHeight);
        }

        canvas.renderAll();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    setIsCanvasInitialized(true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isCanvasInitialized) return;

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const setBackgroundImage = () => {
      fabric.Image.fromURL("/background.png", (img) => {
        img.set({ left: 0, top: 0, selectable: false });
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    };

    setBackgroundImage();

    const layers = [
      { url: "/car.png", x: 350, y: 850 },
      { url: "/person.png", x: 200, y: 650 },
      { url: "/guys.png", x: 400, y: 850 },
      { url: "/cat.png", x: 1500, y: 950 },
    ];

    const addLayer = (url, left, top) => {
      fabric.Image.fromURL(url, (img) => {
        img.set({ left, top, selectable: true });
        img.on("mousedown", () => {
          img.set("opacity", img.opacity === 1 ? 0.5 : 1);
          canvas.renderAll();
        });
        img.hoverCursor = "pointer";
        canvas.add(img);
      });
    };

    layers.forEach((layer) => {
      addLayer(layer.url, layer.x, layer.y);
    });
  }, [isCanvasInitialized]);

  return (
    <div>
      <canvas ref={canvasRef} width={1900} height={1200} />
    </div>
  );
};

export default MyCanvas;
