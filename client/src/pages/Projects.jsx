import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as projectService from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import getErrorMessage from "../utils/getErrorMessage";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateForm = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async ({ title, description }) => {
    try {
      if (editingProject) {
        const updated = await projectService.updateProject(editingProject._id, {
          title,
          description,
        });
        setProjects((prev) =>
          prev.map((project) => (project._id === updated._id ? updated : project))
        );
        toast.success("Project updated");
      } else {
        const created = await projectService.createProject({ title, description });
        setProjects((prev) => [created, ...prev]);
        toast.success("Project created");
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await projectService.deleteProject(deletingProject._id);
      setProjects((prev) => prev.filter((project) => project._id !== deletingProject._id));
      toast.success("Project deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingProject(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Projects</h1>
        <button
          onClick={openCreateForm}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
        >
          New Project
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : projects.length === 0 ? (
        <EmptyState message="You don't have any projects yet. Create your first one to get started." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={openEditForm}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {deletingProject && (
        <ConfirmModal
          title="Delete Project"
          message={`Are you sure you want to delete "${deletingProject.title}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;
