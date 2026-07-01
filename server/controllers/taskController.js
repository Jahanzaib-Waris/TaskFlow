import Task from "../models/Task.js";
import Project from "../models/Project.js";

const findOwnedProject = async (projectId, userId) => {
  return Project.findOne({ _id: projectId, owner: userId });
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getTasks = async (req, res, next) => {
  try {
    const { project, status, priority, search } = req.query;
    const filter = {};

    if (project) {
      const ownedProject = await findOwnedProject(project, req.user._id);
      if (!ownedProject) {
        res.status(404);
        return next(new Error("Project not found"));
      }
      filter.project = project;
    } else {
      const projects = await Project.find({ owner: req.user._id }).select("_id");
      filter.project = { $in: projects.map((p) => p._id) };
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: escapeRegex(search), $options: "i" };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { project, title, description, status, priority, dueDate } = req.body;

    const ownedProject = await findOwnedProject(project, req.user._id);
    if (!ownedProject) {
      res.status(404);
      return next(new Error("Project not found"));
    }

    const task = await Task.create({
      project,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      return next(new Error("Task not found"));
    }

    const ownedProject = await findOwnedProject(task.project, req.user._id);
    if (!ownedProject) {
      res.status(404);
      return next(new Error("Task not found"));
    }

    const { title, description, status, priority, dueDate } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      return next(new Error("Task not found"));
    }

    const ownedProject = await findOwnedProject(task.project, req.user._id);
    if (!ownedProject) {
      res.status(404);
      return next(new Error("Task not found"));
    }

    await task.deleteOne();

    res.json({ success: true, data: { _id: task._id } });
  } catch (error) {
    next(error);
  }
};

export { getTasks, createTask, updateTask, deleteTask };
