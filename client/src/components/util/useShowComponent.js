import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom hook used for opening a component
// i.e. a dialog
// Component is the target component to open

// Component must utilize an 'isShown and "handleUnshow" prop

function useShowComponent(Component) {
  // Boolean to toggle open state
  const [isShown, setIsShown] = useState(false);
  const [passedProps, setPassedProps] = useState({});

  // Optional props to pass from showWith component
  // It acts somewhat as a makeshift state or context in this regard.

  // const handleShow = (callback, propsToPass) => {
  //   if (callback) {
  //     callback();
  //   }
  //   setPassedProps(propsToPass);
  //   setIsShown(true);
  // };

  const handleUnshow = () => {
    setPassedProps({});
    setIsShown(false);
  };

  // The component to open, along with its props as an object
  function showComponent(props) {
    return (
      <Component
        isShown={isShown}
        handleUnshow={handleUnshow}
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
