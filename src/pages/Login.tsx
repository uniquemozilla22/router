import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postData(username, password);
  };

  const postData = async (username: string, password: string) => {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.message);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
