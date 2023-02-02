import { composePath } from "../common/utils.js";
import AuthService from "../services/auth.js";

class Auth {
  async registation(req, res) {
    try {
      const { email, password, role, username } = req.body;
      const avatar = req.file;
      let path;
      
      if (avatar?.path) {
        path = composePath(avatar.path);
      }

      const token = await AuthService.registration({
        username,
        email,
        password,
        role,
        avatar: path,
      });

      res.json(token);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      res.json(token);
    } catch (e) {
      console.log(e);
      res.status(e.status).json(e);
    }
  }
}

export default new Auth();
