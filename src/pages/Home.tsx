import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
const Home = () => {
  const [datas, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await fetch("http://localhost:8080/products", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (data.message) {
      alert(data.message);
      navigate("/login");
    }
    setData([...data]);
  };
  return (
    <>
      {datas?.map((products) => (
        <h1>{products.name}</h1>
      ))}
    </>
  );
};

export default Home;
