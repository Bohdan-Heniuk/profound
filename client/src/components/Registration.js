import styles from "../styles/auth.module.css";
import { Link } from "react-router-dom";
import DataService from "../ds";
import UploadFile from "./UploadFile";
import { useInput } from "../customHooks/useInput";
import { useState } from "react";
import { createFormDataFromObject } from "../utils";

const initialInputValues = {
  email: "",
  password: "",
  role: "",
  username: "",
};

function Registration() {
  const { inputValues, onInputChange, setDefaultValues } = useInput(initialInputValues);
  const [avatar, setAvatar] = useState(null);

  async function register() {
    try {
      const formData = createFormDataFromObject({
        ...inputValues,
        avatar: avatar?.[0],
      });

      const { data } = await DataService.auth.register(formData);

      localStorage.setItem("token", data);
      setDefaultValues(initialInputValues);

      if (inputValues.role === "Recruter") {
        window.location.href = "/companyInfo";
      } else {
        window.location.href = "/";
      }
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_content}>
          <h1 className={styles.page_title}>
            Зареєструватись на <strong>proFound</strong>
          </h1>
          <div className={styles.registration_form}>
            <div className={styles.inputs}>
              <input
                placeholder="Імя"
                name="username"
                className={styles.input}
                onChange={onInputChange}
              ></input>
              <input
                value={inputValues.email}
                placeholder="Email"
                name="email"
                className={styles.input}
                onChange={onInputChange}
              ></input>
              <input
                value={inputValues.password}
                type="password"
                name="password"
                placeholder="Пароль"
                className={styles.input}
                onChange={onInputChange}
              ></input>
              <div className={styles.options_div}>
                <div className={styles.option}>
                  <input
                    type="radio"
                    id="recruter"
                    name="role"
                    value="Recruter"
                    onChange={onInputChange}
                  />
                  <label className={styles.role} htmlFor="recruter">
                    Я роботодавець - шукаю розробників
                  </label>
                </div>

                <div className={styles.option}>
                  <input
                    type="radio"
                    id="candidate"
                    name="role"
                    value="Candidate"
                    onChange={onInputChange}
                  />
                  <label className={styles.role} htmlFor="candidate">
                    Я кандидат - шукаю пропозиції
                  </label>
                </div>
              </div>
            </div>
            <UploadFile value={avatar} onChange={setAvatar} />
          </div>
          <button className={styles.main_button} onClick={register}>
            Продовжити
          </button>
          <Link to="/login" className={styles.link}>
            <p className={styles.have_account}> Я вже маю акаунт</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
