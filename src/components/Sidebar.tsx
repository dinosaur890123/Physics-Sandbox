import React from {React};
import {Materials} from '../constants';

interface SidebarProps {
    activeMaterial: number;
    setActiveMaterial: (mat: number) => void;
    brushSize: number;
    setBruhSize: (size: number) => void;
    onClear: () => void;
}

export default function Sidebar({
    activeMaterial, setActiveMaterial, brushSize, setBrushSize, onClear
}: SidebarProps) {
    return (
        <div className="sidebar">
        <h1>Physics Sandbox</h1>
        <div className="control-group">
            <label className="control-label">Materials</label>
            <button className={`mat-button ${activeMaterial === MATERIALS.SAND ? 'active' : ''}`} onClick={() => setActiveMaterial(MATERIALS.SAND)}>Sand</button>
            <button className={`mat-button ${activeMaterial === MATERIALS.WATER ? 'active' : ''}`} onClick={() => setActiveMaterial(MATERIALS.WATER)}>Water</button>
            <button className={`mat-button ${activeMaterial === MATERIALS.WALL ? 'active' : ''}`} onClick={() => setActiveMaterial(MATERIALS.WALL)}>Wall</button>
            <button className={`mat-button ${activeMaterial === MATERIALS.EMPTY ? 'active' : ''}`} onClick={() => setActiveMaterial(MATERIALS.EMPTY)}>Eraser</button>

            <div className="control-group">
                <label className="control-label">Brush size: {brushSize}</label>
                <input type="range" min="1" max="10" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="brush-slider" />
            </div>
        </div>

        <button className="clear-button" onClick="{onClear}">
            Clear canvas
        </button>
        </div>
    )
}