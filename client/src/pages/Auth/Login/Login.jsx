import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "redux/actions/authAction";
import { Button, Heading, Input } from "components";
import "../auth.scss";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value.toLowerCase() });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userData));
  };

  return (
    <div className="auth">
      <div className="auth_box">
        <Heading>Войти</Heading>

        <form className="auth_box_form" onSubmit={onSubmit}>
          <Input
            value={username}
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <Input
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <p className="auth_text fs-12">
            <Link to="/forgot">Забыли пароль?</Link>
          </p>
          <Button fullWidth type="submit">
            Войти
          </Button>
        </form>

        <p className="auth_text fs-12">
          Нет аккаунта?
          <Link to="/register">Создать аккаунт</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
