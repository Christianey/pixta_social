import { MdSearch as Search, MdClose } from "react-icons/md";
import { useRef, useState } from "react";

const NavSearch = () => {
  const inputRef = useRef();
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("HANDLE SUBMIT WAS CALLED");
  };
  return (
    <form
      className="w-56 h-8 self-center relative bg-gray-100 border-gray-200 border flex items-center"
      style={{ padding: ".1rem .7rem" }}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        className="w-full text-gray-500 bg-transparent"
        name="search"
        value={search}
        onChange={(e) => {
          e.target.value.length
            ? setInputIsEmpty(false)
            : setInputIsEmpty(true);
          setSearch(e.target.value);
        }}
      />
      {inputIsEmpty && (
        <div
          className="text-gray-500 flex items-center absolute top-2/4 left-2/4"
          style={{ transform: "translate(-50%, -50%)" }}
          onClick={() => inputRef.current.focus()}
        >
          <Search className="mr-1" />
          <span>Search</span>
        </div>
      )}
      {!inputIsEmpty && (
        <div>
          <MdClose className="cursor-pointer" onClick={() => setSearch("")} />
        </div>
      )}
    </form>
  );
};

export default NavSearch;
