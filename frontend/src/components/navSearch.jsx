import { MdSearch as Search, MdClose } from "react-icons/md";
import { useRef, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { getData } from "../utils/fetchDataAPI";
import UserCard from "./userCard";

const NavSearch = () => {
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const someFunction = useCallback(
    async (inputValue) => {
      if (!inputValue) {
        handleClose();
        return;
      }
      setLoading(true);
      setNotFound(false);
      setUsers([]);

      try {
        const response = await getData(
          `/search?username=${inputValue}`,
          accessToken
        );
        if (response.data.users.length) return setUsers(response.data.users);
        setNotFound(true);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  const handler = useMemo(
    () =>
      debounce((inputValue) => {
        someFunction(inputValue);
      }, 1000),
    [someFunction]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    handler(e.target.value);
  };

  const handleClose = () => {
    setUsers([]);
    setSearch("");
    setNotFound(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) handleClose();
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
          onChange={handleSubmit}
          onKeyDown={handleKeyPress}
        />

        <div
          className="absolute top-9 bg-white w-full p-5 border-b-0 rounded-b-lg shadow-md"
          style={{
            display: users.length > 0 || notFound || loading ? "block" : "none",
          }}
        >
          {loading && (
            <div className="w-8 h-8 mx-auto">
              <img src="/loadingGif.jpg" alt="loading" />
            </div>
          )}
          {users.length > 0 &&
            users?.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                handleClose={handleClose}
                loading={loading}
              />
            ))}{" "}
          {notFound && (
            <span className="text-gray-600 italic">No results found</span>
          )}
          {error && <span className="text-gray-600 italic">{error}</span>}
        </div>
      </div>

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
              alt="loading"
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
