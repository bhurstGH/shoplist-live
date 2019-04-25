import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom hook used for opening a component
// i.e. a dialog
// Component is the target component to open
// This must utilize an "open" and "handleClose" prop

function useShowComponent(Component) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = e => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // The component to open, along with its props as an object
  function showComponent(props) {
    return <Component open={isOpen} handleClose={handleClose} {...props} />;
  }

  // clickToOpen represents anything (text, button, another component, etc)
  // It will be wrapped in a div that will launch Component on click
  function showComponentWith(clickToOpen) {
    return <div onClick={handleOpen}>{clickToOpen}</div>;
  }

  return [showComponent, showComponentWith];
}

useShowComponent.prototype = {
  Component: PropTypes.element.isRequired
};

export default useShowComponent;
