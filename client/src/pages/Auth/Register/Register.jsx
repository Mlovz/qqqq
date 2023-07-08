import { Button, Heading, Input } from "components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "redux/actions/authAction";
import "../auth.scss";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const { username, password, confirm_password } = userData;
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value.toLowerCase() });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      return setErr("Пароли не совпадают");
    }
    setErr("");

    dispatch(register(userData, navigate));
  };

  return (
    <div className="auth">
      <div className="auth_box">
        <Heading>Регистрация</Heading>

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
          <Input
            value={confirm_password}
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            required
            onChange={handleChange}
          />

          <span className="error fs-12">{err}</span>

          <Button fullWidth type="submit">
            Регистрация
          </Button>
        </form>
        <p className="auth_text fs-12">
          Есть аккаунт?
          <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
