import styles from "../styles/jobBoard.module.css";
import filters from "../filters.json";
import DataService from "../ds";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config.js";
function JobBoard() {
  const [vacancies, setVacancies] = useState([]);

  const [filter, setFilter] = useState({
    specialty: [],
    experience: null,
  });

  async function getByFitler() {
    try {
      const objectFilter = {};

      objectFilter.specialty = filter.specialty.length
        ? filter.specialty
        : undefined;

      objectFilter.experience = filter.experience
        ? filter.experience
        : undefined;

      const { data } = await DataService.vacancy.getByFitler(objectFilter);
      setVacancies(data);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  async function onFilterChange(key, value) {
    const changeExperience = (number) => {
      if (filter.experience === number) {
        number = null;
      }
      setFilter((previos) => {
        return {
          ...previos,
          experience: number,
        };
      });
    };

    const changeSpecialties = (specialty) => {
      const result = filter.specialty;
      const deleteIndex = filter.specialty.indexOf(specialty);
      if (deleteIndex > -1) {
        result.splice(deleteIndex, 1);
      } else {
        result.push(specialty);
      }
      setFilter((previos) => {
        return {
          ...previos,
          specialty: result,
        };
      });
    };

    const operations = {
      specialties: changeSpecialties,
      experience: changeExperience,
    };

    return operations[key](value);
  }

  useEffect(() => {
    getByFitler();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>Вакансії на proFound</h1>
          <h1 className={styles.vacancy_count}>{vacancies.length}</h1>
        </div>

        <div className={styles.page_content}>
          {vacancies.length ? (
            <div className={styles.vacancy_div}>
              {vacancies?.map((vacancy) => {
                return (
                  <div className={styles.vacancy} key={vacancy._id}>
                    <div className={styles.salary_div}>
                      <Link
                        to={`/vacancy/${vacancy._id}`}
                        className={styles.link}
                      >
                        <h3 className={styles.vacancy_title}>{vacancy.name}</h3>
                      </Link>
                      {vacancy.salaryRange.min && (
                        <div className={styles.salary}>
                          ${vacancy.salaryRange.min} - $
                          {vacancy.salaryRange.max}
                        </div>
                      )}
                    </div>
                    <p className={styles.vacancy_info}>
                      {vacancy.shortDescription}
                    </p>

                    <div className={styles.company_info_div}>
                      <img
                        className={styles.company_logo}
                        src={`${config.serverUrl}/${vacancy?.company?.avatar}`}
                        alt=""
                      ></img>

                      <div className={styles.company_info}>
                        <h4 className={styles.company_name}>
                          {vacancy?.company?.name}{" "}
                        </h4>
                        <div className={styles.location_div}>
                          <p className={styles.location}>
                            {" "}
                            {vacancy.creator?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <p className={styles.empty}>
              За обраними фільтрами вакансій не знайдено
            </p>
          )}

          <div className={styles.filter_div}>
            <button onClick={getByFitler} className={styles.main_button}>
              Застосувати
            </button>
            <p className={styles.filter_title}>Спеціалізація</p>
            <p className={styles.speciaties_type}>Технічні</p>
            <div className={styles.specialization_div}>
              {filters.specialties.technical.map((specialty) => {
                return (
                  <button
                    key={specialty}
                    onClick={() => onFilterChange("specialties", specialty)}
                    className={
                      filter.specialty.includes(specialty)
                        ? styles.specialization_checked
                        : styles.specialization
                    }
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
            <p className={styles.speciaties_type}>Не технічні</p>
            <div className={styles.specialization_div}>
              {filters.specialties.nonTechnical.map((specialty) => {
                return (
                  <button
                    key={specialty}
                    className={
                      filter.specialty.includes(specialty)
                        ? styles.specialization_checked
                        : styles.specialization
                    }
                    onClick={() => onFilterChange("specialties", specialty)}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
            <p className={styles.filter_title}>Досвід роботи</p>
            <div className={styles.specialization_div}>
              {filters.experiences.map((experience) => {
                return (
                  <button
                    key={experience}
                    className={
                      filter.experience === experience.value
                        ? styles.specialization_checked
                        : styles.specialization
                    }
                    onClick={() =>
                      onFilterChange("experience", experience.value)
                    }
                  >
                    {experience.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobBoard;
