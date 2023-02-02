import styles from "../styles/recrutiersJobList.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataService from "../ds";
import { config } from "../config.js";

function RecrutiersJobList() {
  const [vacancies, setVacancies] = useState([]);

  async function getAllVacancies() {
    try {
      const { data } = await DataService.vacancy.getByUser();
      setVacancies(data);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllVacancies();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>Мої вакансії</h1>
          <h1 className={styles.vacancy_count}>{vacancies.length}</h1>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/createVacancy";
          }}
          className={styles.main_button}
        >
          Створити нову вакансію
        </button>

        {vacancies.map((vacancy) => {
          return (
            <div className={styles.vacancy} key={vacancy._id}>
              <div className={styles.salary_div}>
                <Link to={`/vacancy/${vacancy._id}`} className={styles.link}>
                  <h3 className={styles.vacancy_title}>{vacancy.name}</h3>
                </Link>
                {vacancy.salaryRange.min && (
                  <div className={styles.salary}>
                    ${vacancy.salaryRange.min} - ${vacancy.salaryRange.max}
                  </div>
                )}
              </div>

              <p className={styles.vacancy_info}>{vacancy.shortDescription}</p>

              <div className={styles.company_info_div}>
                <img
                  alt=""
                  className={styles.company_logo}
                  src={`${config.serverUrl}/${vacancy.company.avatar}`}
                ></img>

                <div className={styles.company_info}>
                  <h4 className={styles.company_name}>
                    {vacancy.company.name}
                  </h4>
                  <div className={styles.location_div}>
                    <p className={styles.location}>
                      {" "}
                      {vacancy.creator.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={styles.link_div}>
          <Link to="/" className={styles.link}>
            <a className={styles.link_to_vacancies}>
              Вакансії інших роботодавців
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecrutiersJobList;
