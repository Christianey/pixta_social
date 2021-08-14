import { MdAccountCircle } from "react-icons/md";

const Avatar = ({ url, ...otherProps }) => {
  return (
    <div {...otherProps}>
      {url ? (
        <img src={url} alt="profile" />
      ) : (
        <MdAccountCircle
          fontSize="large"
          className="color-gray-400 rounded-full mr-1"
          size="1.7rem"
          style={{
            boxShadow: "black 0px 0px 0px 2px",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
