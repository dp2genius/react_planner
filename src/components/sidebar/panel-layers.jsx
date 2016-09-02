import React, {PropTypes} from 'react';
import Panel from './panel.jsx';
import IconVisible from 'react-icons/lib/fa/eye';
import IconHide from 'react-icons/lib/fa/eye-slash';
import IconAdd from 'react-icons/lib/ti/plus';

const STYLE_LAYER_WRAPPER = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  background: "#3A3A3E",
  borderBottom: "1px solid #000",
  height: "40px"
};

const STYLE_LAYER_ACTIVE = {
  ...STYLE_LAYER_WRAPPER,
  background: "#415375"
};

const STYLE_ICON = {
  width: "10%",
  fontSize: "18px",
};

const STYLE_NAME = {
  width: "90%",
  verticalAlign: "center",
  padding: "0 5px"
};

const STYLE_ADD_WRAPPER = {
  fontSize: "15px",
  textAlign: "right"
};

const STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

export default function PanelLayers(props) {

  return (
    <Panel name="Layers">

      <div style={STYLE_LAYER_ACTIVE}>
        <div style={STYLE_ICON}><IconVisible /></div>
        <div style={STYLE_NAME}>Nome layer</div>
      </div>

      <div style={STYLE_LAYER_WRAPPER}>
        <div style={STYLE_ICON}><IconVisible /></div>
        <div style={STYLE_NAME}>Nome layer</div>
      </div>

      <div style={STYLE_LAYER_WRAPPER}>
        <div style={STYLE_ICON}><IconHide /></div>
        <div style={STYLE_NAME}>Nome layer</div>
      </div>

      <div style={STYLE_ADD_WRAPPER}>
        <IconAdd />
        <span style={STYLE_ADD_LABEL}>New Layer</span>
      </div>
    </Panel>
  )

}

PanelLayers.propTypes = {
  scene: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

PanelLayers.contextTypes = {};
