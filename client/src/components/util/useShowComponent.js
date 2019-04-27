import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom hook used for opening a component
// i.e. a dialog
// Component is the target component to open

// Component must utilize an 'isShown and "handleShow" prop

function useShowComponent(Component, showComeponentCallback) {
  // Boolean to toggle open state
  const [isShown, setIsShown] = useState(false);
  const [passedProps, setPassedProps] = useState({});
  const [showCondition, setShowCondition] = useState();
  const [propertyNames, setPropertyNames] = useState({
    show: "isShown",
    handler: "handleShow"
  });

  // Optional props to pass from showWith component
  // It acts somewhat as a makeshift state or context in this regard.

  const handleUnshow = () => {
    setPassedProps({});
    setIsShown(false);
  };

  // The component to open, along with its props as an object
  function showComponent(props) {
    return (
      <Component
        isShown={isShown}
        handleShow={handleUnshow}
        {...props}
        {...passedProps}
      />
    );
  }

  function showComponentWith(clickToShow, callback, propsToPass = {}) {
    function showWith() {
      if (callback) {
        callback();
      }
      setPassedProps(propsToPass);
      setIsShown(true);
    }

    function showThis() {
      return <span onClick={() => showWith()}>{callback()}</span>;
    }

    if (!clickToShow) {
      showWith(callback, propsToPass);
    }
    return <div onClick={() => showWith()}>{clickToShow}</div>;
  }

  return [showComponent, showComponentWith];
}

useShowComponent.prototype = {
  Component: PropTypes.element.isRequired
};

export default useShowComponent;
