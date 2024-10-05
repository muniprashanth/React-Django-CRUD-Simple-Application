// Overlay.js
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomOverlay = ({ children, overlayContent }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {overlayContent}
        </Tooltip>
      );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
        {children}
    </OverlayTrigger>
  );
};

export default CustomOverlay;
