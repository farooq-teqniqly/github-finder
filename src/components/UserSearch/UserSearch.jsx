import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Row, Card, Image } from "react-bootstrap";
import { FaGithubAlt } from "react-icons/fa";

export const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUserName] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUsername}`
      );

      if (!res.ok) {
        throw new Error("User not found.");
      }

      return await res.json();
    },
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
            <Card>
              <Card.Header className="d-flex align-items-center">
                <Image
                  src={data.avatar_url}
                  alt={data.name || data.login}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "10px",
                    flexShrink: 0,
                  }}
                />
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <div className="fw-bold text-break">
                    {data.name || data.login}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div>
                  <p>{data.bio || "The user has not entered any bio."}</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  href={data.html_url}
                  variant="primary"
                  type="submit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithubAlt className="mx-2"></FaGithubAlt>
                  View Github Profile
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
