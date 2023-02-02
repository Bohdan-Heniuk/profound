import VacancyService from "../services/vacancy.js";

class Vacancy {
  async getByUser(req, res) {
    try {
      const userId = req.user._id;
      const vacancies = await VacancyService.getByFitler({
        creator: userId,
      });
      res.json(vacancies);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async getByFitler(req, res) {
    try {
      const filter = req.body || {};
      const user = req.user
      const vacancies = await VacancyService.getByFitler(filter, user);
      res.json(vacancies);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async getById(req, res) {
    try {
      const vacancyId = req.params.id;
      const candidate = req.user
      const vacancy = await VacancyService.getById(vacancyId, candidate);
      res.json(vacancy);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async create(req, res) {
    try {
      const {
        name,
        detailedDescription,
        salaryRange = null,
        specialty,
        experience,
        shortDescription,
      } = req.body;

      const creator = req.user._id;

      const newVacancy = await VacancyService.create({
        name,
        salaryRange,
        creator,
        specialty,
        experience,
        shortDescription,
        detailedDescription,
      });

      res.json(newVacancy);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async update(req, res) {
    try {
      const payload = req.body;
      const updated = await VacancyService.update(payload);
      res.json(updated);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async apply(req, res) {
    try {
      const cv = req.file;
      const { coverLetter = "" } = req.body
      const { vacancyId } = req.params;
      const { user } = req;

      await VacancyService.apply(vacancyId, user._id, cv, coverLetter);

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new Vacancy();
