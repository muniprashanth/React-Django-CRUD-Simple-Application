// CollapseSection.js
import React from 'react';
import { Collapse } from 'react-bootstrap';

const CustomCollapse= ({ open, children }) => {
  return (
    <Collapse in={open}>
        <div id="example-collapse-text">
            {children}
        </div>
    </Collapse>
  );
};

export default CustomCollapse;