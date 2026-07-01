import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getDashboard = async (req, res, next) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).select("_id");
    const projectIds = projects.map((p) => p._id);

    const [totalTasks, completedTasks, recentTasks] = await Promise.all([
      Task.countDocuments({ project: { $in: projectIds } }),
      Task.countDocuments({ project: { $in: projectIds }, status: "Completed" }),
      Task.find({ project: { $in: projectIds } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("project", "title"),
    ]);

    res.json({
      success: true,
      data: {
        totalProjects: projects.length,
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
        recentTasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getDashboard };
