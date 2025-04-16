import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://backendbookproject.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Отправка данных для логина:", data);

      if (!response.ok) {
        throw new Error("Неверный логин или пароль");
      }

      const result = await response.json();
      console.log("Ответ сервера (логин):", result);
      console.log("Статус ответа:", response.status);

      login(result, result.token);

      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: "Введите почту" })}
            placeholder="Почта"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
            placeholder="Пароль"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">Войти</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
