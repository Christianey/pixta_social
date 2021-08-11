import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authThunk from "../redux/reducers/auth/auth.thunk";
import {
  MdAccountCircle as AccountCircle,
  MdExplore as Explore,
  MdFavorite as Favorite,
  MdNearMe as NearMe,
  MdArrowDropDown as ArrowDropdown,
  MdHome as Home,
} from "react-icons/md";
import { IconContext } from "react-icons";

const navLinks = [
  {
    icon: <Home />,
    label: "Home",
    path: "/",
  },
  {
    icon: <NearMe />,
    label: "Message",
    path: "/message",
  },
  {
    icon: <Explore />,
    label: "Discover",
    path: "/discover",
  },
  {
    icon: <Favorite />,
    label: "Notifications",
    path: "/notifications",
  },
];

const NavMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function isActive(match) {
    if (!match) return false;
    return true;
  }
  const logout = () => {
    dispatch(authThunk.logout());
  };
  const style = {
    padding: "0 .3rem",
    stroke: "black",
    strokeWidth: "1px",
    fill: "transparent",
  };
  return (
    <nav className="flex items-center">
      {navLinks.map((nav) => (
        <NavLink
          strict
          exact
          activeStyle={{
            fill: "black",
          }}
          isActive={isActive}
          to={nav.path}
          key={nav.label}
          style={style}
        >
          <IconContext.Provider
            value={{
              style: { ...style, fill: "inherit" },
              size: "2rem",
            }}
          >
            {nav.icon}
          </IconContext.Provider>
        </NavLink>
      ))}
      <div className="inline-block relative group">
        <button className="text-lg font-semibold py-2 px-4 rounded inline-flex items-center">
          <AccountCircle
            fontSize="large"
            className="color-gray-400 rounded-full mr-1"
            size="1.7rem"
            style={{
              boxShadow: "black 0px 0px 0px 2px",
            }}
          />{" "}
          <ArrowDropdown />
        </button>
        <ul className="absolute hidden bg-white pt-1 group-hover:block w-max">
          <li className="rounded-t hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
            <Link to={`/profile/${[user._id]}`}>Profile</Link>
          </li>
          <li className="rounded-t hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap">
            <label htmlFor="theme">Dark Mode</label>
          </li>
          <li
            className="rounded-t border-t cursor-pointer border-gray-200 hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
