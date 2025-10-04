import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Button, Col, Form, Row, ListGroup, Image } from "react-bootstrap";

import { fetchGithubUser, searchGithubUser } from "../../api/github";
import { UserCard } from "../UserCard/UserCard";
import { RecentSearches } from "../RecentSearches/RecentSearches";
import { SuggestionDropdown } from "../SuggestionDropdown/SuggestionDropdown";

export const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUserName] = useState("");

  const [recentUsers, setRecentUsers] = useState(() => {
    const stored = localStorage.getItem("recentUsers");
    return stored ? JSON.parse(stored) : [];
  });

  const [disabled, setDisabled] = useState(false);

  const [debouncedUsername] = useDebounce(username, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  const setFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    setFocus();
  }, []);

  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
  }, [recentUsers]);

  // Query to fetch a specific user.
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  // Query to fetch suggestions for user search.
  const { data: suggestions } = useQuery({
    queryKey: ["github-user-suggestions", debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 0,
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
    setUsername("");
    setFocus();
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
                onChange={(e) => {
                  const val = e.target.value;
                  setUsername(val);
                  setShowSuggestions(val.trim().length > 1);
                }}
              />
              {showSuggestions && suggestions?.length > 1 && (
                <SuggestionDropdown
                  suggestions={suggestions}
                  onSelectUsername={(username) => {
                    setUsername(username);
                    setShowSuggestions(false);

                    if (submittedUsername !== username) {
                      setSubmittedUserName(username);
                    } else {
                      refetch();
                    }
                  }}
                ></SuggestionDropdown>
              )}
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
            onDeleteRecentSearches={() => {
              setRecentUsers([]);
              setSubmittedUserName("");
              setUsername("");
              setFocus();
            }}
          ></RecentSearches>
        </div>
      )}
    </>
  );
};
