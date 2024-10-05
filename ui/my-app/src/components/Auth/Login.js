import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [randomText, setRandomText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateRandomText = () => {
    var string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var OTP = '';
    var len = string.length;
    for (var i = 0; i < 6; i++) {
      OTP = OTP + string[Math.floor(Math.random() * len)];
    }
    return OTP;
  };

  React.useEffect(() => {
    setRandomText(generateRandomText());
  }, []);

  const getRandomRotation = () => {
    return Math.random() * 30 - 15;
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateCaptcha = () => {
    setRandomText(generateRandomText());
    setUserInput('');
  };

  const handlePaste = (event) => {
    event.preventDefault();
    alert("Copy paste is disabled");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <div className='center-container-login'>
                  <h2>Login</h2>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>
                  <br />
                  <Container>
                    <Row>
                      <Col xs={5}>
                        <div className="captcha-container">
                          <p className="captcha-text" onCopy={handlePaste}
                            onCut={handlePaste}
                            onDrag={handlePaste}
                            onDrop={handlePaste}
                            onPaste={handlePaste}
                            onClick={handleGenerateCaptcha}>
                            {randomText.split('').map((char, index) => (
                              <span
                                key={index}
                                style={{
                                  transform: `rotate(${getRandomRotation()}deg)`,
                                  display: 'inline-block',
                                }}
                              >
                                {char}
                              </span>
                            ))}
                          </p>
                        </div>
                      </Col>
                      <Col xs={7}>
                        <Form.Group controlId="captchaInput">
                          <Form.Control
                            type="text"
                            value={userInput}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            onCopy={handlePaste}
                            onCut={handlePaste}
                            onDrag={handlePaste}
                            onDrop={handlePaste}
                            placeholder='Enter the captcha'
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                  <Button variant="primary" type="submit" block>
                    Login
                  </Button>
                  <br />
                  <p>
                    Create one <a href="/register">Register</a>
                  </p>
                  <p>
                    Forgot Password <a href="/forgot-password/">Click here</a>
                  </p>
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <img src="/images/svg/Login.svg" alt="404" className="responsive-undraw-image" />
              </Form.Group>
            </Row>
          </Form>
        </div>
        <br />
      </div>
    </>
  );
};

export default Login;
