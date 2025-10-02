import { Col, ListGroup, Row } from "react-bootstrap";
import { FaClock, FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { fetchGithubUser } from "../../api/github";

export const RecentSearches = ({ users, onSelectUser }) => {
  const queryClient = useQueryClient();

  return (
    <>
      <Row>
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
            {users.map((user) => (
              <ListGroup.Item
                key={user}
                action
                onClick={() => onSelectUser(user)}
                onMouseEnter={() => {
                  queryClient.prefetchQuery({
                    queryKey: ["users", user],
                    queryFn: () => fetchGithubUser(user),
                  });
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
  );
};
