import React from "react";

// Helper component for opening a dialog by clicking any element passed as props
export function ShowDialog(props) {
  // openDialog is the dialog components set function for changing open state
  const { openDialog, children } = props;

  return <div onClick={() => openDialog(true)}>{children}</div>;
}
