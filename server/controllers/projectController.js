import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      owner: req.user._id,
      title,
      description,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });

    if (!project) {
      res.status(404);
      return next(new Error("Project not found"));
    }

    const { title, description } = req.body;
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;

    await project.save();

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!project) {
      res.status(404);
      return next(new Error("Project not found"));
    }

    await Task.deleteMany({ project: project._id });

    res.json({ success: true, data: { _id: project._id } });
  } catch (error) {
    next(error);
  }
};

export { getProjects, createProject, updateProject, deleteProject };
