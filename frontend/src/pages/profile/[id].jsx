import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/fetchDataAPI";
import Info from "../../components/info";
import Posts from "../../components/posts";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [, setError] = useState("");
  // const dispatch = useDispatch();
  console.log(userProfile);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserProfile(auth.user);
    } else {
      getData(`/user/${id}`, auth.accessToken)
        .then(({ data }) => setUserProfile(data.user))
        .catch((error) => setError(error.response.data.message));
    }
  }, [id, auth.user, auth.accessToken]);
  return (
    <div className="">
      <Info />
      <Posts />
    </div>
  );
};

export default Profile;
