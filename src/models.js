import {Record, List, Map} from 'immutable';
import {MODE_IDLE} from './constants';


export const Guide = Record({
  id: "",
  type: "",
  properties: Map()
}, 'Guide');

export const DefaultGuides = new Map({
  'h1': new Guide({
    id: 'h1',
    type: 'horizontal-streak',
    properties: new Map({
      step: 20,
      color: '#ddd'
    })
  }),
  'h2': new Guide({
    id: 'h2',
    type: 'horizontal-streak',
    properties: new Map({
      step: 100,
      color: '#808080'
    })
  }),
  'v1': new Guide({
    id: 'v1',
    type: 'vertical-streak',
    properties: new Map({
      step: 20,
      color: '#ddd'
    })
  }),
  'v2': new Guide({
    id: 'v2',
    type: 'vertical-streak',
    properties: new Map({
      step: 100,
      color: '#808080'
    })
  })
});

export const ElementsSet = Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List(),
  items: new List(),
}, 'ElementsSet');

export const Layer = Record({
  id: "",
  altitude: 0,
  name: "",
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  items: new Map(),
  selected: new ElementsSet(),
  visible: true
}, 'Layer');


export const Scene = Record({
  pixelPerUnit: 100,
  unit: "m",
  layers: new Map({
    'layer-1': new Layer({id: 'layer-1', name: 'default layer'})
  }),
  guides: DefaultGuides,
  selectedLayer: 'layer-1',
  width: 3000,
  height: 2000
}, 'Scene');


export const Vertex = Record({
  id: "",
  x: -1,
  y: -1,
  prototype: "vertices",
  selected: false,
  lines: new List(),
  areas: new List(),
}, 'Vertex');

export const Line = Record({
  id: "",
  type: "",
  prototype: "lines",
  vertices: new List(),
  holes: new List(),
  selected: false,
  properties: new Map()
}, 'Line');

export const Hole = Record({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  selected: false,
  properties: new Map(),
}, 'Hole');

export const Area = Record({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new List(),
  selected: false,
  properties: new Map()
}, 'Area');

export const Item = Record({
  id: "",
  prototype: 'items',
  type: "",
  properties: new Map(),
  selected: false,
  x: 0,
  y: 0,
  rotation: 0
}, 'Item');

export const State = Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  viewer2D: new Map(),

  snapElements: new List(),
  activeSnapElement: null,

  drawingSupport: Map(),
  draggingSupport: Map(),
  rotatingSupport: Map()
}, 'State');

