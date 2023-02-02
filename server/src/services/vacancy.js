import VacancyModel from "../db/models/vacancy.js";
import AppliesModel from "../db/models/vacancyApplies.js";
import { transporter } from "./nodemailer.js";
import VacancyApplies from "../db/models/vacancyApplies.js";
import { BadRequest } from "../common/errors.js";
import CompanyModel from "../db/models/company.js";
import { POPULATED_FIELDS, Roles } from "../common/enums.js";
import VacancyViews from "../db/models/vacancyViews.js";
class Vacancy {
  async getByFitler(filter, user = null) {
    try {
      const vacancies = await VacancyModel.find(filter)
        .populate(POPULATED_FIELDS)
        .lean();

      if (user && user.role === Roles.Candidate) {
        for (const vacancy of vacancies) {
          const isAlreadyApplied = Boolean(
            await VacancyApplies.findOne({
              vacancy: vacancy._id,
              candidate: user._id,
            })
          );
          vacancy.isAlreadyApplied = isAlreadyApplied
        }
      }

      return vacancies;
    } catch (e) {
      console.log("Failted to get by filter", e);
      throw e;
    }
  }

  async getById(vacancyId, candidate) {
    try {
      const vacancy = await VacancyModel.findById(vacancyId).populate(
        POPULATED_FIELDS
      );

      await vacancy.save();
      const vacancyToObject = vacancy.toObject();

      if (candidate) {
        const isViewed = Boolean(
          await VacancyViews.findOne({
            vacancy: vacancyId,
            candidate: candidate._id,
          })
        );

        if (!isViewed && candidate.role === Roles.Candidate) {
          await VacancyViews.create({
            vacancy: vacancyId,
            candidate: candidate._id,
          });
        }

        if (candidate.role === Roles.Candidate) {
          vacancyToObject.isAlreadyApplied = Boolean(
            await VacancyApplies.findOne({
              vacancy: vacancyId,
              candidate: candidate._id,
            })
          );
        }
      }

      const applicationCount = await VacancyApplies.count({
        vacancy: vacancyId,
      });

      const viewsCount = await VacancyViews.count({
        vacancy: vacancyId,
      });

      vacancyToObject.viewsCount = viewsCount;
      vacancyToObject.applicationsCount = applicationCount;

      return vacancyToObject;
    } catch (e) {
      console.log("Failed get vacancy by id", e);
      throw e;
    }
  }

  async create({
    name,
    creator,
    shortDescription,
    detailedDescription,
    salaryRange,
    specialty,
    experience,
  }) {
    try {
      const company = (await CompanyModel.findOne({ creator }))._id;

      const newVacancy = await VacancyModel.create({
        name,
        creator,
        shortDescription,
        detailedDescription,
        salaryRange,
        experience,
        specialty,
        company,
      });

      return newVacancy;
    } catch (e) {
      console.log("Failed to create vacancy", e);
    }
  }

  async update(id, payload) {
    try {
      const updated = await CompanyModel.findByIdAndUpdate(id, payload);
      return updated;
    } catch (e) {
      console.log("Failed to update vacancy", e);
      throw e;
    }
  }

  async apply(vacancyId, candidateId, cv, coverLetter) {
    try {
      const isAlreadyApplied = await AppliesModel.findOne({
        candidate: candidateId,
        vacancy: vacancyId,
      });

      if (isAlreadyApplied) {
        throw new BadRequest("Вже відгукнулись!");
      }

      const vacancy = await VacancyModel.findOne({ _id: vacancyId }).populate(
        "creator"
      );

      const mailOptions = {
        from: "bohdantest330@gmail.com",
        to: vacancy.creator.email,
        subject: `Новий відгук від Profound! ${vacancy.name}`,
        text: coverLetter,
        attachments: [
          {
            filename: cv.originalname,
            content: cv.buffer,
          },
        ],
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      await AppliesModel.create({
        candidate: candidateId,
        vacancy: vacancyId,
      });
    } catch (e) {
      console.log("Failed to apply on vacancy", e);
      throw e;
    }
  }
}

export default new Vacancy();
