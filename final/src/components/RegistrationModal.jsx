import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const RegistrationModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        "https://backendbookproject.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.warn("Ошибка парсинга JSON:", text);
      }

      console.log("Ответ сервера:", data);
      console.log("Код ответа:", res.status);

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      
        localStorage.setItem("user", JSON.stringify(data.user || formData));
        setUser(data.user || formData);
        setMessage("Регистрация прошла успешно!");
        onClose();
      } else {
        setMessage(data.message || "Ошибка при регистрации");
      }
      
    } catch (err) {
      console.error("Ошибка подключения к серверу:", err);
      setMessage("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            {...register("name", {
              required: "Требуется указать имя",
              minLength: {
                value: 2,
                message: "Имя должно содержать не менее 2 символов",
              },
            })}
            placeholder="Имя пользователя"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            type="email"
            {...register("email", {
              required: "Требуется электронная почта",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Адрес электронной почты недействителен",
              },
            })}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Требуется ввести пароль",
              minLength: {
                value: 8,
                message: "Пароль должен содержать не менее 8 символов",
              },
              validate: {
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Пароль должен содержать хотя бы одну цифру",
                hasLetter: (value) =>
                  /[A-Za-z]/.test(value) ||
                  "Пароль должен содержать хотя бы одну букву",
              },
            })}
            placeholder="Пароль"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">Зарегистрироваться</button>
        </form>

        {message && (
          <p style={{ marginTop: "10px", color: "red" }}>{message}</p>
        )}
        <button className="close-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default RegistrationModal;
