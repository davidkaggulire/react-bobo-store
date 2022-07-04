import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./DropDown.module.css";

const DropdownBackdrop = (props) => {
  return <div className={classes.dropdown__backdrop} onClick={props.onClose} />;
};

const DropDownOverlay = (props) => {
  return (
    <div className={classes.dropdown__modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const DropDown = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <DropdownBackdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <DropDownOverlay status={props.status}>
          {props.children}
        </DropDownOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default DropDown;
