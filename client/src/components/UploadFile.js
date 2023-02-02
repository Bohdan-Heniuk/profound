import styles from "../styles/uploadPhoto.module.css";
import { uploadImages } from "../utils.js";

function UploadFile({ value, onChange, multiple = false }) {
  return (
    <div className={styles.preview_images_div}>
      <div className={styles.preview_images}>
        {value && (
          <img
            src={window.URL.createObjectURL(new Blob(value))}
            className={styles.preview_image}
            alt=""
          ></img>
        )}
      </div>
      <div className={styles.upload_image_div}>
        <label htmlFor="file-upload" className={styles.custom_file_upload}>
          Завантажити файл
        </label>
      </div>
      <input
        id="file-upload"
        type="file"
        multiple={multiple}
        onChange={(e) => uploadImages(e.target.files, onChange)}
      />
    </div>
  );
}

export default UploadFile;
