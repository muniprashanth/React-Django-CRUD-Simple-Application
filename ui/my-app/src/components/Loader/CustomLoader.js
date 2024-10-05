import React from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import './Loader.css'; // Import a custom CSS file for styling

const CustomLoader = ({ text }) => {
  return (
    <div className="loader-container">
      <div className='center-container'>
        <Row>
          <Col>
            <Spinner animation="grow" variant="primary" />
          </Col>
          <Col>
            <Spinner animation="grow" variant="info" />
          </Col>
          <Col>
            <Spinner animation="grow" variant="secondary" />
          </Col>
        </Row>
        <br />
        <div className="loader-text">
          {text || 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
