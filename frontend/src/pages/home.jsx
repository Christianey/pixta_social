import { Link } from "react-router-dom";

const Home = () => {
  return (
    <h1>
      Home Page <Link to="/loginSignUp">Go to Login</Link>
    </h1>
  );
};

export default Home;
