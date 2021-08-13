import { Link } from "react-router-dom";
import Avatar from "./avatar";
const style = `

`;
const UserCard = ({ user, handleClose }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      onClick={handleClose}
      className="cursor-pointer"
    >
      <div className="flex items-center mb-2 border-b border-gray-50">
        <Avatar url={user.avatar} className="mr-2" />
        <div className="flex flex-col">
          <h6 className="font-bold">{user.fullName}</h6>
          <p>{user.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
