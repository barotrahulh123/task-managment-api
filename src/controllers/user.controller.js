import * as Yup from "yup";
import User from "../models/User";
import {
  BadRequestError,
  ValidationError,
} from "../utils/ApiError";

//Yup is a JavaScript schema builder for value parsing and validation.

let userController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const { email } = req.body;

      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) throw new ValidationError('User Already Exist');

      const user = await User.create(req.body);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  find: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) throw new BadRequestError();

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
