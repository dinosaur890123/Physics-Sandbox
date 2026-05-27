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
      for (let)
    }
  }

})