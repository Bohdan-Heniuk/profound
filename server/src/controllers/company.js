import { BadRequest } from "../common/errors.js";
import CompanyService from "../services/company.js";
import { composePath } from "../common/utils.js";
class Company {
  async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequest("BAD REQUEST");
      }
      const company = await CompanyService.getById(id);
      res.json(company);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const avatar = req.file;
      let path;
      if (avatar?.path) {
        path = composePath(avatar.path);
      }
      const updated = await CompanyService.update(id, {
        ...payload,
        avatar: path,
      });
      res.json(updated);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new Company();
