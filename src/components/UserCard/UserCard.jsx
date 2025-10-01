import { Card, Button, Image } from "react-bootstrap";
import { FaGithubAlt } from "react-icons/fa";

export const UserCard = ({ user }) => {
  return (
    <Card>
      <Card.Header className="d-flex align-items-center">
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          style={{
            width: "32px",
            height: "32px",
            marginRight: "10px",
            flexShrink: 0,
          }}
        />
        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <div className="fw-bold text-break">{user.name || user.login}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <p>{user.bio || "The user has not entered any bio."}</p>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button
          href={user.html_url}
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
  );
};
