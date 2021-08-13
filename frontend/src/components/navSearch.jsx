import { MdSearch as Search, MdClose } from "react-icons/md";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authThunk from "../redux/reducers/auth/auth.thunk";
import { getData } from "../utils/fetchDataAPI";
import UserCard from "./userCard";

const NavSearch = () => {
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    setLoading(true);
    setNotFound(false);
    setUsers([]);

    try {
      const response = await getData(`/search?username=${search}`, accessToken);
      if (response.data.users.length) return setUsers(response.data.users);
      setNotFound(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsers([]);
    setSearch("");
    setNotFound(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 27) handleClose();
  };

  return (
    <form
      className="w-56 h-7 md:h-8 self-center relative bg-gray-100 border-gray-200 border flex items-center"
      onSubmit={handleSubmit}
    >
      <div className="relative" style={{ width: "inherit" }}>
        <input
          ref={inputRef}
          style={{ padding: ".1rem .7rem" }}
          type="text"
          className="w-full text-gray-500 bg-transparent flex items-center"
          name="search"
          value={search}
          id="search"
          title="Enter to search"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
            setTimeout(() => handleSubmit(e), 1000);
          }}
          onKeyDown={handleKeyPress}
        />
        <div
          className="absolute top-9 bg-white w-full p-5 border-b-0 rounded-b-lg shadow-md"
          style={{ display: users.length > 0 || notFound ? "block" : "none" }}
        >
          {users.length > 0 &&
            users?.map((user) => (
              <UserCard key={user._id} user={user} handleClose={handleClose} />
            ))}{" "}
          {notFound && (
            <span className="text-gray-600 italic">No results found</span>
          )}
        </div>
      </div>
      <button type="submit" style={{ display: "none" }}>
        Search
      </button>
      {!search && (
        <div
          className="text-gray-500 flex items-center absolute top-2/4 left-2/4 cursor-text"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={() => inputRef.current.focus()}
        >
          <Search className="mr-1" />
          <span>Search</span>
        </div>
      )}
      {search && (
        <div>
          {!loading && (
            <MdClose
              className="cursor-pointer ml-1 child absolute"
              style={{ transform: "translate(-180%, -50%)" }}
              onClick={handleClose}
            />
          )}
          {loading && (
            <img
              src="/loadingGif.jpg"
              width="15px"
              height="15px"
              className="cursor-pointer ml-1 child absolute"
              style={{ transform: "translate(-180%, -50%)" }}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default NavSearch;
