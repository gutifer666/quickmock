import { Node, NodeConfig } from 'konva/lib/Node';
import { Box } from 'konva/lib/shapes/Transformer';
import { Coord, ShapeType, Size } from '@/core/model';

interface TransFormSelectedInfo {
  selectedShapeRef: React.MutableRefObject<Node<NodeConfig> | null>;
  selectedShapeId: string;
  selectedShapeType: ShapeType | null;
}

export const useTransform = (
  updateShapeSizeAndPosition: (id: string, position: Coord, size: Size) => void,
  transformSelectedInfo: TransFormSelectedInfo
) => {
  const { selectedShapeId, selectedShapeRef } = transformSelectedInfo;

  const handleTransform = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const position = { x: node.x(), y: node.y() };

    const newWidth = node.width() * scaleX;
    const newHeight = node.height() * scaleY;

    updateShapeSizeAndPosition(selectedShapeId, position, {
      width: newWidth,
      height: newHeight,
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  const handleTransformerBoundBoxFunc = (oldBox: Box, newBox: Box) => {
    if (newBox.width < 5 || newBox.height < 5) {
      return oldBox;
    }
    return newBox;
  };

  return { handleTransform, handleTransformerBoundBoxFunc };
};
