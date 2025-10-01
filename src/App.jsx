import { Container, Col, Row } from "react-bootstrap";
import { UserSearch } from "./components/UserSearch/UserSearch";

function App() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-4">Github Finder</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserSearch></UserSearch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
