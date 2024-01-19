import { useParams, useSearchParams } from "react-router-dom";

const Category = () => {
  const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  if (query == "books") {
    console.log(searchParams.get("sorted"));
  }
  return (
    <>
      <button
        onClick={() =>
          setSearchParams(new Map(searchParams).set("sorted", "Asc"))
        }
      ></button>
      {query +
        (searchParams.get("sorted") ? " on " + searchParams.get("sorted") : "")}
    </>
  );
};

export default Category;
