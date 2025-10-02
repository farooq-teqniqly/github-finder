import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Row, ListGroup } from "react-bootstrap";
import { FaClock, FaUser } from "react-icons/fa";

import { fetchGithubUser } from "../../api/github";
import { UserCard } from "../UserCard/UserCard";

export const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUserName] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = username.trim();

    if (!trimmed) {
      return;
    }

    setSubmittedUserName(trimmed);

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  return (
    <>
      {isLoading && <p className="text-muted">Searching...</p>}

      {isError && <p className="text-danger">{error.message}</p>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {data && (
        <Row>
          <Col md={4}>
            <UserCard user={data}></UserCard>
          </Col>
        </Row>
      )}

      {recentUsers.length > 0 && (
        <>
          <Row className="mt-3">
            <Col md={1}>
              <FaClock></FaClock>
            </Col>
            <Col md={3}>
              <h3>Recent Searches</h3>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <ListGroup>
                {recentUsers.map((user) => (
                  <ListGroup.Item
                    key={user}
                    action
                    onClick={() => {
                      setUsername(user);
                      setSubmittedUserName(user);
                    }}
                  >
                    <FaUser className="m-3"></FaUser>
                    {user}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
