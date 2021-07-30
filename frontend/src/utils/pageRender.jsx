import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/notFound";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = id ? `${page}/${id}` : page;
  // console.log(useParams());
  // console.log(pageName);
  return generatePage(pageName);
};

export default PageRender;
