import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Button } from "./ui/button";
import { Eraser, Pen, Redo, RotateCcw, Save, Undo } from "lucide-react";
import { Slider } from "./ui/slider";

const Canvas = forwardRef(function Canvas(
  {},
  ref: React.Ref<{ exportCanvas: () => Promise<string | undefined> }>
) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#a855f7");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [eraseMode, setEraseMode] = useState(false);

  useImperativeHandle(ref, () => ({
    async exportCanvas() {
      const dataUrl = await canvasRef.current?.exportImage("png");
      return dataUrl;
    },
  }));

  function handleStrokeColorChange(event: ChangeEvent<HTMLInputElement>) {
    setStrokeColor(event.target.value);
    console.log(strokeColor);
  }

  function handleEraserClick() {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }

  function handlePenClick() {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }

  function handleUndoClick() {
    canvasRef.current?.undo();
  }

  function handleRedoClick() {
    canvasRef.current?.redo();
  }

  function handleClearClick() {
    canvasRef.current?.clearCanvas();
  }

  async function handleSave() {
    const dataURL = await canvasRef.current?.exportImage("png");
    if (dataURL) {
      const link = Object.assign(document.createElement("a"), {
        href: dataURL,
        style: { display: "none" },
        download: "sketch.png",
      });

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  return (
    <div className="flex flex-col max-w-2xl gap-4">
      <div className="flex flex-row items-center gap-2">
        {/* Color picker */}
        <Button
          size="icon"
          type="button"
          onClick={() => colorInputRef.current?.click()}
          style={{ backgroundColor: strokeColor }}
        >
          <input
            type="color"
            ref={colorInputRef}
            className="sr-only"
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
        </Button>

        {/* Drawing mode */}
        <Button
          size="icon"
          type="button"
          variant="outline"
          disabled={!eraseMode}
          onClick={handlePenClick}
        >
          <Pen size={16} />
        </Button>
        {!eraseMode && (
          <Slider
            defaultValue={[strokeWidth]}
            max={100}
            step={1}
            value={[strokeWidth]}
            disabled={eraseMode}
            id="strokeWidth"
            onValueChange={(value) => setStrokeWidth(value[0])}
          />
        )}

        <Button
          size="icon"
          type="button"
          variant="outline"
          disabled={eraseMode}
          onClick={handleEraserClick}
        >
          <Eraser size={16} />
        </Button>

        {eraseMode && (
          <Slider
            defaultValue={[eraserWidth]}
            max={100}
            step={1}
            value={[eraserWidth]}
            disabled={!eraseMode}
            id="eraserWidth"
            onValueChange={(value) => setEraserWidth(value[0])}
          />
        )}

        {/* Actions */}
        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleUndoClick}
        >
          <Undo size={16} />
        </Button>
        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleRedoClick}
        >
          <Redo size={16} />
        </Button>
        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleClearClick}
        >
          <RotateCcw size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleSave}
        >
          <Save size={16} />
        </Button>
      </div>

      <ReactSketchCanvas
        width="100%"
        height="430px"
        ref={canvasRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        canvasColor="transparent"
        className="!rounded-2xl !border-gray-200 "
      />
    </div>
  );
});

export default Canvas;
