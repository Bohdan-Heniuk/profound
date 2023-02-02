import styles from "../styles/vacancy.module.css";
import { useParams } from "react-router-dom";
import DataService from "../ds";
import { useState, useEffect } from "react";
import { config } from "../config.js";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import moment from "moment";
import { createFormDataFromObject, getUser, uploadImages} from "../utils";
import { useInput } from "../customHooks/useInput";

const initialInputValues = {
  coverLetter: "",
};
function Vacancy() {
  const [vacancy, setVacancy] = useState({});
  const { inputValues, onInputChange, setDefaultValues } = useInput(initialInputValues);
  const [cv, setCV] = useState("");

  const userData = getUser();
  const { vacancyId } = useParams();

  async function getVacancy() {
    try {
      const { data } = await DataService.vacancy.getById(vacancyId);
      setVacancy(data);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }
  async function apply() {
    try {
      const formData = createFormDataFromObject({
        coverLetter: inputValues.coverLetter,
        CV: cv[0],
      });

      await DataService.vacancy.apply(vacancyId, formData);

      setCV("");
      setDefaultValues(initialInputValues);

      getVacancy();
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    getVacancy();
    window.scrollTo(0, 0);
  }, [vacancyId]);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <div className={styles.salary_div}>
            <h1 className={styles.page_title}>{vacancy?.name}</h1>
            {vacancy?.salaryRange?.min && (
              <div className={styles.salary}>
                ${vacancy.salaryRange.min} - ${vacancy.salaryRange.max}
              </div>
            )}
          </div>
        </div>
        <div className={styles.company_info_div}>
          <img
            className={styles.company_logo}
            src={`${config.serverUrl}/${vacancy?.company?.avatar}`}
            alt=""
          ></img>

          <div className={styles.company_info}>
            <h4 className={styles.company_name}>{vacancy?.company?.name}</h4>
            <div className={styles.location_div}>
              <p className={styles.location}>{vacancy?.creator?.username}</p>
            </div>
          </div>
        </div>
        <div className={styles.vacancy_info_div}>
          <div className={styles.descriptions}>
            <div className={styles.short_description}>
              {vacancy.shortDescription}
            </div>
            <div className={styles.detailed_description}>
              {vacancy.detailedDescription}
            </div>
          </div>
          <div className={styles.vacancy_info}>
            <p className={styles.info}>•ㅤКатегорія: {vacancy.specialty}</p>
            <p className={styles.info}>•ㅤ{vacancy.experience} роки досвіду</p>
          </div>
        </div>
        {vacancy.isAlreadyApplied || userData.role === "Recruter" ? null : (
          <div className={styles.aplication_div}>
            <textarea
              name="coverLetter"
              value={inputValues.coverLetter}
              placeholder="Cover letter"
              className={styles.cover_letter}
              onChange={onInputChange}
            ></textarea>
            <div className={styles.upload_image_div}>
              <label
                htmlFor="file-upload"
                className={styles.custom_file_upload}
              >
                Завантажити CV
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => uploadImages(e.target.files, setCV)}
              />
            </div>
            <span>{cv[0]?.name}</span>
          </div>
        )}

        <div className={styles.site_div}>
          <p className={styles.site_title}>Сторінка на Dou:</p>
          <a className={styles.site_link} href={vacancy?.company?.douLink}>
            {vacancy?.company?.douLink}
          </a>
        </div>

        <div className={styles.site_div}>
          <p className={styles.site_title}>Сайт компанії:</p>
          <a className={styles.site_link} href={vacancy?.company?.siteLink}>
            {vacancy?.company?.siteLink}
          </a>
        </div>

        <div className={styles.stats_div}>
          <div className={styles.date_div}>
            <AiOutlineEdit />
            <p className={styles.date}>
              Вакансія опублікована{" "}
              {moment(vacancy.createdAt).format("DD.MM.YYYY")}
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.views}>
              <AiOutlineEye />
              <p>{vacancy.viewsCount} переглядів</p>
            </div>
            <div className={styles.aplications}>
              <BsFillPeopleFill />
              <p>{vacancy.applicationsCount} відгуків</p>
            </div>
          </div>
        </div>

        {userData.role === "Candidate" && (
          <button
            onClick={apply}
            className={
              vacancy.isAlreadyApplied
                ? styles.main_button_disabled
                : styles.main_button
            }
            disabled={vacancy.isAlreadyApplied}
          >
            {vacancy.isAlreadyApplied ? "Вже відгукнулися" : "Відгукнутися"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Vacancy;
