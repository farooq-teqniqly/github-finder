import { Card, Button, Image } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  checkIfFollowingUser,
  followUser,
  unfollowUser,
} from "../../api/github";
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";

export const UserCard = ({ user }) => {
  // Query to check if user is following.
  const {
    data: isFollowing,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["follow-status", user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: !!user.login,
  });

  // Mutation to follow user.
  const followMutation = useMutation({
    mutationFn: () => followUser(user.login),
    onSuccess: () => {
      console.log(`You are now following ${user.login}.`);
      refetch();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  // Mutation to unfollow user.
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(user.login),
    onSuccess: () => {
      console.log(`You are no longer following ${user.login}.`);
      refetch();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
      return;
    }

    followMutation.mutate();
  };

  const showButton =
    import.meta.env.VITE_FEATURE_ENABLE_FOLLOWING.toLowerCase() === "true";

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

        {showButton && !isLoading && (
          <Button
            className="mx-2"
            variant={isFollowing ? "danger" : "secondary"}
            onClick={handleFollow}
          >
            {isFollowing ? (
              <>
                <FaUserMinus className="mx-2"></FaUserMinus>
                Unfollow
              </>
            ) : (
              <>
                <FaUserPlus className="mx-2"></FaUserPlus>
                Follow
              </>
            )}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};
