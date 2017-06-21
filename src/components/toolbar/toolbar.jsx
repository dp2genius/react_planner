import React from 'react';
import PropTypes from 'prop-types';
import IconNewFile from 'react-icons/lib/fa/file-o';
import IconPointer from 'react-icons/lib/fa/mouse-pointer';
import IconZoomPlus from 'react-icons/lib/ti/zoom-in';
import IconZoomMinus from 'react-icons/lib/ti/zoom-out';
import IconPan from 'react-icons/lib/fa/hand-paper-o';
import Icon3DFirstPerson from 'react-icons/lib/md/directions-run';
import IconCatalog from 'react-icons/lib/fa/plus';
import IconUndo from 'react-icons/lib/md/undo';
import IconConfigure from 'react-icons/lib/md/settings';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from "../../utils/react-if";
import {
  MODE_IDLE,
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from '../../constants';

const Icon2D = () => <p style={{
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px"
}}>2D</p>;

const Icon3D = () => <p style={{
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px"
}}>3D</p>;

const ASIDE_STYLE = { backgroundColor: '#28292D', padding: "10px" };

export default function Toolbar({state, width, height, toolbarButtons, allowProjectFileSupport}, {
  projectActions,
  viewer2DActions,
  editingActions,
  viewer3DActions,
  linesActions,
  holesActions,
  itemsActions,
  translator,
}) {

  let mode = state.get('mode');

  let mode3DCondition = ![MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode);

  let sorter = [
    {
      index: 0, condition: allowProjectFileSupport, dom: () =>
        <ToolbarButton
          active={false}
          tooltip={translator.t("New project")}
          onClick={event => projectActions.newProject()}>
            <IconNewFile />
        </ToolbarButton>
    },
    { index: 1, condition: allowProjectFileSupport, dom: () => <ToolbarSaveButton state={state}/> },
    { index: 2, condition: allowProjectFileSupport, dom: () => <ToolbarLoadButton state={state}/> },
    { index: 3, condition: true, dom: () =>
        <ToolbarButton
          active={[MODE_VIEWING_CATALOG].includes(mode)}
          tooltip={translator.t("Open catalog")}
          onClick={event => projectActions.openCatalog()}>
          <IconCatalog />
        </ToolbarButton>
    },
    {
      index: 4, condition: true, dom: () =>
        <ToolbarButton
          active={[MODE_3D_VIEW].includes(mode)}
          tooltip={translator.t("3D View")}
          onClick={event => viewer3DActions.selectTool3DView()}>
          <Icon3D />
        </ToolbarButton>
    },
    {
      index: 5, condition: true, dom: () =>
        <ToolbarButton
          active={[MODE_IDLE].includes(mode)}
          tooltip={translator.t("2D View")}
          onClick={event => projectActions.rollback()}>
            {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? <Icon2D/> : <IconPointer/>}
        </ToolbarButton>
    },
    {
      index: 6, condition: true, dom: () =>
        <ToolbarButton
          active={[MODE_3D_FIRST_PERSON].includes(mode)}
          tooltip={translator.t("3D First Person")}
          onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
            <Icon3DFirstPerson />
        </ToolbarButton>
    },
    {
      index: 7, condition: mode3DCondition, dom: () =>
        <ToolbarButton
          active={[MODE_2D_ZOOM_IN].includes(mode)}
          tooltip={translator.t("Zoom in")}
          onClick={event => viewer2DActions.selectToolZoomIn()}>
            <IconZoomPlus />
        </ToolbarButton>
    },
    {
      index: 8, condition: mode3DCondition, dom: () =>
        <ToolbarButton
          active={[MODE_2D_ZOOM_OUT].includes(mode)}
          tooltip={translator.t("Zoom out")}
          onClick={event => viewer2DActions.selectToolZoomOut()}>
            <IconZoomMinus />
        </ToolbarButton>
    },
    {
      index: 9, condition: mode3DCondition, dom: () =>
        <ToolbarButton
          active={[MODE_2D_PAN].includes(mode)}
          tooltip={translator.t("Pan")}
          onClick={event => viewer2DActions.selectToolPan()}>
            <IconPan />
        </ToolbarButton>
    },
    {
      index: 10, condition: true, dom: () =>
        <ToolbarButton
          active={false}
          tooltip={translator.t("Undo (CTRL-Z)")}
          onClick={event => projectActions.undo()}>
            <IconUndo />
        </ToolbarButton>
    },
    {
      index: 11, condition: true, dom: () =>
        <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t("Configure project")}
          onClick={event => projectActions.openProjectConfigurator()}>
            <IconConfigure />
        </ToolbarButton>
    }
  ];

  sorter = sorter.sort( ( a, b ) => { return ( a.index || 0 ) - ( b.index || 0 ) } );

  return (
    <aside style={{...ASIDE_STYLE, maxWidth: width, maxHeight: height}} className="toolbar">

      {
        sorter.map( ( el, ind ) => { /*console.log( el, ind );*/ return ( <If key={ind} condition={el.condition}>{ el.dom() }</If> ) } )
      }
      {
        toolbarButtons.map((Component, index) => <Component mode={mode} state={state} key={index}/>)
      }
    </aside>
  )
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
