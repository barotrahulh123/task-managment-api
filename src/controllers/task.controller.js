import * as Yup from "yup";
import Task from "../models/Task";
import { BadRequestError, ValidationError, InternalServerError } from "../utils/ApiError";
import { Sequelize } from 'sequelize';

let taskController = {
  add: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        userId: Yup.number().required(),

      });

      if (!(await schema.isValid(req.body))) throw new ValidationError();

      const TaskExists = await Task.findOne({
        where: { title: req.body.title, userId: req.body.userId },
      });

      if (TaskExists) throw new BadRequestError('Task Title Must be unique');

      const task = await Task.create(req.body);

      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },

  getList: async (req, res, next) => {
    try {
      const page = req.body.page; // page number
      const perPage = req.body.limit; // number of items per page
      const offset = (page - 1) * perPage;

      const tasks = await Task.findAll({
        where: {
          userId: req.body.userId, 
        },
        limit: perPage,
        offset: offset,
      });

      if (tasks.length === 0) throw new InternalServerError('No Task found for user', 500);

      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        userId: Yup.number().required(),
      });
  
      if (!(await schema.isValid(req.body))) {
        throw new ValidationError();
      }
  
      const taskId = req.params.taskId;
      const task = await Task.findByPk(taskId);
  
      if (!task) {
        throw new NotFoundError('Task not found');
      }
  
      // Check if the title or description fields are empty in the request body
      if (req.body.title === '' || req.body.description === '') {
        throw new BadRequestError('Title and description cannot be empty');
      }
  
      // Update the task with the provided data
      await task.update(req.body);
  
      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  
  },

  find: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByPk(taskId);

      if (!task) throw new InternalServerError('No task found', 500);

      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },
  getMetrics: async (req, res, next) => {
    try {
      const [openTasksCount, inprogressTasksCount, completedTasksCount] =
        await Promise.all([
          Task.count({ where: { status: 'open' } }),
          Task.count({ where: { status: 'inprogress' } }),
          Task.count({ where: { status: 'completed' } }),
        ]);
  
      const totalMetrics = {
        open_tasks: openTasksCount,
        inprogress_tasks: inprogressTasksCount,
        completed_tasks: completedTasksCount,
      };

      const metrics = await Task.findAll({
        attributes: [
          [Sequelize.literal('DATE_FORMAT(updatedAt, "%M %Y")'), 'month'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'taskCount'],
          'status',
        ],
        group: ['month', 'status'],
      });
  
      // Convert the metrics data to the desired format
      const formattedMetrics = {};
  
      metrics.forEach((metric) => {
        const month = metric.getDataValue('month');
        const status = metric.getDataValue('status');
        const taskCount = metric.getDataValue('taskCount');
  
        if (!formattedMetrics[month]) {
          formattedMetrics[month] = {
            date: month,
            metrics: {
              open_tasks: 0,
              inprogress_tasks: 0,
              completed_tasks: 0,
            },
          };
        }
  
        formattedMetrics[month].metrics[status + '_tasks'] = taskCount;
      });
  
      // Convert metric object to an array of objects
      const result = Object.values(formattedMetrics);

      totalMetrics.monthly = result
  
      res.json(totalMetrics);
  
      // res.json(metrics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default taskController;
