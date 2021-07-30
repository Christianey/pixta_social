import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Oops! Page Not Found - Pixta";
  }, []);

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        minHeight: "calc(100vh - 7rem)",
      }}
    >
      <h1>Sorry, page not found</h1>
    </div>
  );
};

export default NotFound;
