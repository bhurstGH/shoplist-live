import React, { useState } from "react";
import PropTypes from "prop-types";

// Helper component for showing a component by clicking any element passed in as a child
// i.e. opening a dialog
function ShowComponent(props) {
  // showWith is component's function for changing open state
  const { showWith, input } = props;

  return (
    <React.Fragment>
      <div onClick={showWith}>{input}</div>
    </React.Fragment>
  );
}

ShowComponent.propTypes = {
  showWith: PropTypes.func
};
export default ShowComponent;

// function shoCo() {
//   const { component } = props;

//   return (
//     <React.Fragment>
//       {param => {
//         <component {...componentProps} />;
//       }}
//     </React.Fragment>
//   );
// }

export function useShowComponent(Component) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = e => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function showComponent(props) {
    return <Component open={isOpen} handleClose={handleClose} {...props} />;
  }

  function showWith(clickToOpen) {
    return <div onClick={handleClick}>{clickToOpen}</div>;
  }

  return [showComponent, showWith];
}
