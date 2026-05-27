import React, {useEffect, useRef, useState} from 'react';
const MATERIALS = {EMPTY: 0,SAND: 1,WATER: 2,WALL: 3};
const COLUMNS = 150;
const ROWS = 100;
const COLORS = {
[MATERIALS.EMPTY]: [26, 26, 26, 255],
[MATERIALS.SAND]: [234, 179, 8, 255],
[MATERIALS.WATER]: [59, 130, 246, 255],
[MATERIALS.WALL]: [100, 116, 139, 255],
};
const createGrid = () => Array.from({length: ROWS}, () => new Array(COLUMNS).fill(MATERIALS.EMPTY));

export default function App() {
const canvasRef = useRef<HTMLCanvasElement>(null);
const [brushSize, setBrushSize] = useState(3);
const [activeMaterial, setActiveMaterial] = useState(MATERIALS.SAND);
const gridRef = useRef<number[][]>(createGrid());
const mouseRef = useRef({isDown: false, x: 0, y: 0});
const materialRef = useRef(activeMaterial);
const brushSizeRef = useRef(brushSize);


useEffect(() => {materialRef.current = activeMaterial;}, [activeMaterial]);
useEffect(() => {brushSizeRef.current = brushSize;}, [brushSize]);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const offScreenCanvas = document.createElement('canvas');

  let animationFrameId = Number;
  const isEmpty = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && gridRef.current[r][c] === MATERIALS.EMPTY;
  const isWater = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && gridRef.current[r][c] === MATERIALS.WATER;
  const paint = () => {
    if (!mouseRef.current.isDown) return;
    const {x, y} = mouseRef.current;
    const radius = brushSizeRef.current;
    const mat = materialRef.current;
    const grid = gridRef.current;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const r = y + dy;
          const c = x + dx;
          if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS) {
            grid[r][c] = mat;
          }
        }
      }
    }
  };

  const updatePhysics = () => {
    const grid = gridRef.current;
    for (let r = ROWS - 2; r >= 0; r--) {
      const dir = Math.random() < 0.567 ? 1 : -1; // haha 67
      for (let i = 0; i < COLS; i++) {
        const c = dir === 1 ? i : COLS - 1 - i;
        const mat = grid[r][c]; // note to self, mat is short for material not a literal mat

        if (mat === MATERIALS.SAND) {
          if (isEmpty(r + 1, c) || isWater(r + 1, c)) {
            const temp = grid[r + 1][c];
            grid[r + 1][c] = mat;
            grid[r][c] = temp;
          } else if (isEmpty(r + 1, c - 1) || isWater(r + 1, c - 1)) {
            const temp = grid[r + 1][c - 1];
            grid[r + 1][c - 1] = mat;
            grid[r][c] = temp;
          } else if (isEmpty(r + 1, c + 1) || isWater(r + 1, c + 1)) {
            const temp = grid[r + 1][c + 1];
            gid[r + 1][c + 1] = mat;
            grid[r][c] = temp;
          }
        } else if (mat === MATERIALS.water) {
          if (isEmpty(r + 1, c)) {
            grid[r + 1][c] = mat;
            grid[r][c] = MATERIALS.EMPTY;
          } else if (isEmpty(r + 1, c - 1)) {
            grid[r + 1][c - 1] = mat;
            grid[r][c] = MATERIALS.EMPTY;
          } else if (isEmpty(r + 1, c + 1)) {
            grid[r + 1][c + 1] = mat;
            grid[r][c] = MATERIALS.EMPTY;
          } else if (isEmpty(r, c - 1)) {
            grid[r][c - 1] = mat;
            grid[r][c] = MATERIALS.EMPTY;
          } else if (isEmpty(r, c + 1)) {
            grid[r][c + 1] = mat;
            grid[r][c] = MATERIALS.EMPTY;
          }
        }
      }
    }
  }

  const draw = () => {
    const imgData = offCtx.createImageData(COLUMNS, ROWS);
    const data = imgData.data;
    const grid = gridRef.current;
    
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLUMNS; c++) {
        const idx (r * COLS + c) * 4;
        const color = COLORS[grid[r][c]];
        data[idx] = color[0];
        data[idx + 1] = color[1];
        data[idx + 2] = color[2];
        data[idx + 3] = color[3];
      }
    }
    offCtx.putImageData(imgData, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);
  };
  const loop = () => {
    paint();
    updatePhysics();
    draw();
    animationFrameId = requestAnimationFrame(loop);
    };


    loop();
    return () => cancelAnimationFrame(animationFrameId);
}, []);

const handlePointer = (e: React.PointerEvent, isDown?: boolean) => {
  if (isDown !== undefined) mouseRef.current.isDown = isDown;
  const rect = e.currentTarget.getBoundingClientRect();
  const scaleX = COLUMNS / rect.width;  
  const scaleY = ROWS / rect.height;

  mouseRef.current.x = Math.floor((e.clientX - rect.left) * scaleX);
  mouseRef.current.y = Math.floor((e.clientY - rect.top) * scaleY);
};
return (
  <div className="canvas-container">
  <canvas
    ref={canvasRef}
    width={COLUMNS}
    height={ROWS}
    className="sandbox-canvas"
    onPointerDown={(e) => handlePointer(e, true)}
    onPointerUp={(e) => handlePointer(e, false)}
    onPointerMove={(e) => handlePointer(e)}
    onPointerLeave={(e) => handlePointer(e, false)}
    />
    </div>
  );
}