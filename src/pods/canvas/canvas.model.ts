import { Coord, ShapeType, Size, ShapeModel, EditType } from '@/core/model';
import { v4 as uuidv4 } from 'uuid';

import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getListboxShapeSizeRestrictions,
  getTextAreaSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
  getProgressBarShapeSizeRestrictions,
  getDatepickerInputShapeSizeRestrictions,
  getButtonShapeSizeRestrictions,
  getTimepickerInputShapeSizeRestrictions,
} from '@/common/components/front-components';
import {
  getBrowserWindowShapeSizeRestrictions,
  getMobilePhoneShapeSizeRestrictions,
  getTabletShapeSizeRestrictions,
} from '@/common/components/front-containers';
import { getLabelSizeRestrictions } from '@/common/components/front-components/label-shape';
import {
  getDiamondShapeSizeRestrictions,
  getRectangleShapeSizeRestrictions,
} from '@/common/components/front-basic-sapes';
import { getVideoPlayerShapeSizeRestrictions } from '@/common/components/front-rich-components';

export const getDefaultSizeFromShape = (shapeType: ShapeType): Size => {
  switch (shapeType) {
    case 'label':
      return {
        width: getLabelSizeRestrictions().defaultWidth,
        height: getLabelSizeRestrictions().defaultHeight,
      };
    case 'combobox':
      return {
        width: getComboBoxShapeSizeRestrictions().defaultWidth,
        height: getComboBoxShapeSizeRestrictions().defaultHeight,
      };
    case 'input':
      return {
        width: getInputShapeSizeRestrictions().defaultWidth,
        height: getInputShapeSizeRestrictions().defaultHeight,
      };
    case 'toggleswitch':
      return {
        width: getToggleSwitchShapeSizeRestrictions().defaultWidth,
        height: getToggleSwitchShapeSizeRestrictions().defaultHeight,
      };
    case 'textarea':
      return {
        width: getTextAreaSizeRestrictions().defaultWidth,
        height: getTextAreaSizeRestrictions().defaultHeight,
      };
    case 'datepickerinput':
      return {
        width: getDatepickerInputShapeSizeRestrictions().defaultWidth,
        height: getDatepickerInputShapeSizeRestrictions().defaultHeight,
      };
    case 'button':
      return {
        width: getButtonShapeSizeRestrictions().defaultWidth,
        height: getButtonShapeSizeRestrictions().defaultHeight,
      };
    case 'progressbar': {
      return {
        width: getProgressBarShapeSizeRestrictions().defaultWidth,
        height: getProgressBarShapeSizeRestrictions().defaultHeight,
      };
    }
    case 'listbox':
      return {
        width: getListboxShapeSizeRestrictions().defaultWidth,
        height: getListboxShapeSizeRestrictions().defaultHeight,
      };
    case 'browser':
      return {
        width: getBrowserWindowShapeSizeRestrictions().defaultWidth,
        height: getBrowserWindowShapeSizeRestrictions().defaultHeight,
      };
    case 'mobilePhone':
      return {
        width: getMobilePhoneShapeSizeRestrictions().defaultWidth,
        height: getMobilePhoneShapeSizeRestrictions().defaultHeight,
      };
    case 'tablet':
      return {
        width: getTabletShapeSizeRestrictions().defaultWidth,
        height: getTabletShapeSizeRestrictions().defaultHeight,
      };
    case 'timepickerinput':
      return {
        width: getTimepickerInputShapeSizeRestrictions().defaultWidth,
        height: getTimepickerInputShapeSizeRestrictions().defaultHeight,
      };
    case 'rectangle':
      return {
        width: getRectangleShapeSizeRestrictions().defaultWidth,
        height: getRectangleShapeSizeRestrictions().defaultHeight,
      };
    case 'videoPlayer':
      return {
        width: getVideoPlayerShapeSizeRestrictions().defaultWidth,
        height: getVideoPlayerShapeSizeRestrictions().defaultHeight,
      };
    case 'diamond':
      return {
        width: getDiamondShapeSizeRestrictions().defaultWidth,
        height: getDiamondShapeSizeRestrictions().defaultHeight,
      };
    default:
      return { width: 200, height: 50 };
  }
};

const doesShapeAllowInlineEdition = (shapeType: ShapeType): boolean => {
  switch (shapeType) {
    case 'input':
    case 'label':
    case 'combobox':
    case 'button':
    case 'textarea':
      return true;
    default:
      return false;
  }
};

const generateDefaultTextValue = (shapeType: ShapeType): string | undefined => {
  switch (shapeType) {
    case 'input':
      return '';
    case 'label':
      return 'Label';
    case 'combobox':
      return 'Select an option';
    case 'button':
      return 'Click Me!';
    case 'textarea':
      return 'Your text here...';
    default:
      return undefined;
  }
};

const getShapeEditInlineType = (shapeType: ShapeType): EditType | undefined => {
  const result = undefined;

  switch (shapeType) {
    case 'textarea':
      return 'textarea';
      break;
  }
  return result;
};

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
export const createShape = (coord: Coord, shapeType: ShapeType): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultSizeFromShape(shapeType);

  return {
    id: uuidv4(),
    x,
    y,
    width,
    height,
    type: shapeType,
    allowsInlineEdition: doesShapeAllowInlineEdition(shapeType),
    text: generateDefaultTextValue(shapeType),
    editType: getShapeEditInlineType(shapeType),
  };
};

// Snap model
export const SNAP_THRESHOLD = 5;

export type SnapLines = {
  vertical: number[];
  horizontal: number[];
};

export type SnapType = 'center' | 'start' | 'end';

export interface SnapEdge {
  guide: number;
  offset: number;
  snapType: SnapType;
}

export type SnapEdges = {
  vertical: SnapEdge[];
  horizontal: SnapEdge[];
};

export type SnapLineSubset = {
  snapLine: number;
  diff: number;
  snap: SnapType;
  offset: number;
};

export type ClosestSnapLines = {
  vertical: SnapLineSubset | null;
  horizontal: SnapLineSubset | null;
};
