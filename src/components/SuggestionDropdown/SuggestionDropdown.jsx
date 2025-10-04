import { ListGroup, Image } from "react-bootstrap";

export const SuggestionDropdown = ({ suggestions, onSelectUsername }) => {
  return (
    <ListGroup className="mt-3">
      {suggestions.slice(0, 5).map((user) => (
        <ListGroup.Item
          key={user.login}
          action
          onClick={() => onSelectUsername(user.login)}
        >
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
          {user.login}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
