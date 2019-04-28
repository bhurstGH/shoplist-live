import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom hook used for opening a component
// i.e. a dialog
// Component is the target component to open

// Component must utilize an 'isShown and "handleShow" props

function useShowComponent(Component) {
  // Boolean to toggle open state
  const [isShown, setIsShown] = useState(false);
  // Optional props passed from callback
  const [passedProps, setPassedProps] = useState({});
  // Reference to the callback's return, if any
  const [callbackReturn, setCallbackReturn] = useState();

  // Default toggle off function
  const unshow = () => {
    setPassedProps({});
    setIsShown(false);
  };

  // The component to open, along with its props as an object
  function showComponent(props) {
    if (isShown) {
      return (
        <Component
          isShown={isShown}
          handleShow={unshow}
          {...props}
          passedProps={passedProps}
          cbRef={callbackReturn}
        />
      );
    }
  }

  // The trigger function. Wrap around whatever you desire to make clickable
  // Or, pass "null" to the first parameter and use as a normal onClick handler.
  // Callback available, passes setPassedProps as its first argument for use.
  function showComponentWith(clickToShow, callback) {
    function showWith() {
      if (callback) {
        const res = callback(setPassedProps);
        setCallbackReturn(res);
      }
      setIsShown(true);
    }

    if (!clickToShow) {
      showWith(callback);
    }
    return <div onClick={() => showWith()}>{clickToShow}</div>;
  }

  return [showComponent, showComponentWith];
}

useShowComponent.prototype = {
  Component: PropTypes.element.isRequired
};

export default useShowComponent;
