import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { ThemeProvider, Container, Row, Col, Card } from 'react-bootstrap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <App />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </ThemeProvider>
  </React.StrictMode>
);
