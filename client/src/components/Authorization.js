import styles from "../styles/auth.module.css";
import { Link } from "react-router-dom";
import DataService from "../ds";
import { useInput } from "../customHooks/useInput.js";

const initialInputValues = {
  email: "",
  password: "",
};

function Authorization() {
  const {inputValues, onInputChange} = useInput(initialInputValues);

  async function login() {
    try {
      const { data } = await DataService.auth.login(
        inputValues.email,
        inputValues.password
      );

      localStorage.setItem("token", data);
      window.location.href = "/";
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_content}>
          <h1 className={styles.page_title}>
            Увійти на <strong>proFound</strong>
          </h1>
          <div className={styles.inputs}>
            <input
              name="email"
              placeholder="Email"
              className={styles.input}
              onChange={onInputChange}
            ></input>
            <input
              name="password"
              placeholder="Пароль"
              type="password"
              className={styles.input}
              onChange={onInputChange}
            ></input>
          </div>
          <button className={styles.main_button} onClick={() => login()}>
            Продовжити
          </button>
          <Link to="/signup" className={styles.link}>
            <p className={styles.have_account}>Зареєструватись</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
