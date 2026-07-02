import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as projectService from "../services/projectService";
import * as taskService from "../services/taskService";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import useDebouncedValue from "../hooks/useDebouncedValue";
import getErrorMessage from "../utils/getErrorMessage";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  useEffect(() => {
    projectService
      .getProjects()
      .then((projects) => setProject(projects.find((p) => p._id === id) || null))
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setProjectLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let isCurrent = true;
    setTasksLoading(true);

    taskService
      .getTasks({ project: id, search: debouncedSearch, status, priority })
      .then((data) => {
        if (isCurrent) setTasks(data);
      })
      .catch((error) => {
        if (isCurrent) toast.error(getErrorMessage(error));
      })
      .finally(() => {
        if (isCurrent) setTasksLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [id, debouncedSearch, status, priority]);

  const refetchTasks = () => {
    taskService
      .getTasks({ project: id, search: debouncedSearch, status, priority })
      .then(setTasks)
      .catch((error) => toast.error(getErrorMessage(error)));
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      const payload = { ...values, dueDate: values.dueDate || undefined };

      if (editingTask) {
        await taskService.updateTask(editingTask._id, payload);
        toast.success("Task updated");
      } else {
        await taskService.createTask({ ...payload, project: id });
        toast.success("Task created");
      }
      setIsFormOpen(false);
      refetchTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await taskService.deleteTask(deletingTask._id);
      setTasks((prev) => prev.filter((task) => task._id !== deletingTask._id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingTask(null);
    }
  };

  if (projectLoading) return <LoadingSpinner />;

  if (!project) {
    return <EmptyState message="Project not found." />;
  }

  const isFiltering = Boolean(search || status || priority);

  return (
    <div>
      <Link to="/projects" className="text-sm font-medium text-violet-600 hover:underline">
        ← Back to Projects
      </Link>

      <div className="mt-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-1 text-gray-500 dark:text-gray-400">{project.description}</p>
          )}
        </div>
        <button
          onClick={openCreateForm}
          className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-violet-500 hover:to-purple-500"
        >
          New Task
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search tasks by title..." />
        <FilterPanel
          status={status}
          priority={priority}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />
      </div>

      {tasksLoading ? (
        <LoadingSpinner />
      ) : tasks.length === 0 ? (
        <EmptyState
          message={
            isFiltering
              ? "No tasks match your search or filters."
              : "No tasks yet. Add your first task for this project."
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditForm}
              onDelete={setDeletingTask}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {deletingTask && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete "${deletingTask.title}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
