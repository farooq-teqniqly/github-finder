import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Row } from "react-bootstrap";

import { fetchGithubUser } from "../../api/github";
import { UserCard } from "../UserCard/UserCard";

export const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUserName] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUserName(username.trim());
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
    </>
  );
};
