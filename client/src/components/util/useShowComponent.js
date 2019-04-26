import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom hook used for opening a component
// i.e. a dialog
// Component is the target component to open

// Component must utilize an 'isShown and "handleUnshow" prop

function useShowComponent(Component) {
  // Boolean to toggle open state
  const [isShown, setIsShown] = useState(false);

  // Optional props to pass from showWith component
  // It acts somewhat as a makeshift state or context in this regard.
  const [propsToPass, setPropsToPass] = useState();

  const handleShow = () => {
    setIsShown(true);
  };

  const handleUnshow = () => {
    setIsShown(false);
  };

  // The component to open, along with its props as an object
  function showComponent(props) {
    return (
      <Component
        isShown={isShown}
        handleUnshow={handleUnshow}
        {...props}
        {...propsToPass}
      />
    );
  }

  // clickToShow represents anything (text, button, another component, etc)
  // It will be wrapped in a div that will launch Component on click

  // propsObject: optional props you can pass as the 2nd argument of showWith.

  // For versatility:
  // Pass 'null' to clickToShow and the component can be passed as a normal onClick handler
  function showComponentWith(clickToShow) {
    if (!clickToShow) {
      return handleShow();
    }
    return <div onClick={() => handleShow()}>{clickToShow}</div>;
  }

  return [showComponent, showComponentWith];
}

useShowComponent.prototype = {
  Component: PropTypes.element.isRequired
};

export default useShowComponent;
