import render3D from './wall-generic.3d.js';
import React from 'react';
import {distanceFromTwoPoints} from '../../utils/geometry';

let pathSVG = React.createFactory('path');
let gSVG = React.createFactory('g');
let textSVG = React.createFactory('text');
let lineSVG = React.createFactory('line');

export default {
  name: "wall",
  prototype: "lines",

  info: {
    tag: ['muro'],
    group: "Comunicazione orizzontale",
    description: "Muro in mattoni o pittura",
    image: require('./wall.png')
  },

  properties: {
    height: {
      type: "number",
      defaultValue: 300
    },
    thickness: {
      type: "number",
      defaultValue: 20
    },
    textureA: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    },
    textureB: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    }
  },

  render2D: function (line, layer, scene) {
    const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2"};
    const STYLE_SELECTED = {stroke: "#99c3fb", strokeWidth: "5px", fill: "#000"};
    const STYLE_TEXT = {textAnchor: "middle"};
    const STYLE_LINE = {stroke: "#99c3fb"};

    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let {x:x1, y:y1} = layer.vertices.get(line.vertices.get(0));
    let {x:x2, y: y2} = layer.vertices.get(line.vertices.get(1));

    let length = distanceFromTwoPoints(x1, y1, x2, y2);
    let path = `M${0} ${ -epsilon}  L${length} ${-epsilon}  L${length} ${epsilon}  L${0} ${epsilon}  z`;

    return (line.selected) ?
      gSVG({}, [
        pathSVG({key: 3, d: path, style: line.selected ? STYLE_SELECTED : STYLE_BASE}),
        lineSVG({key: 2, x1: length / 5, y1: -39, x2: length / 5, y2: 38, style: STYLE_LINE}),
        textSVG({key: 1, x: length / 5, y: 50, style: STYLE_TEXT}, "A"),
        textSVG({key: 4, x: length / 5, y: -40, style: STYLE_TEXT}, "B"),
      ]) :
      pathSVG({key: 3, d: path, style: line.selected ? STYLE_SELECTED : STYLE_BASE})
  },

  render3D,

};
