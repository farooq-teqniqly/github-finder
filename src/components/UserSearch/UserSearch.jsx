import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Row } from "react-bootstrap";

import { fetchGithubUser } from "../../api/github";
import { UserCard } from "../UserCard/UserCard";
import { RecentSearches } from "../RecentSearches/RecentSearches";

export const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUserName] = useState("");

  const [recentUsers, setRecentUsers] = useState(() => {
    const stored = localStorage.getItem("recentUsers");
    return stored ? JSON.parse(stored) : [];
  });

  const [disabled, setDisabled] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
  }, [recentUsers]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  useEffect(() => {
    if (data && submittedUsername) {
      setRecentUsers((prev) => {
        const updated = [
          submittedUsername,
          ...prev.filter((u) => u !== submittedUsername),
        ];
        return updated.slice(0, 5);
      });
    }
  }, [data, submittedUsername]);

  useEffect(() => {
    setDisabled(isLoading);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = username.trim();

    if (!trimmed) {
      return;
    }

    setSubmittedUserName(trimmed);
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
                disabled={disabled}
                ref={inputRef}
                type="text"
                placeholder="Enter Github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit" disabled={disabled}>
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
        <div className="mt-5">
          <RecentSearches
            users={recentUsers}
            onSelectUser={(user) => {
              setUsername(user);
              setSubmittedUserName(user);
            }}
          ></RecentSearches>
        </div>
      )}
    </>
  );
};
