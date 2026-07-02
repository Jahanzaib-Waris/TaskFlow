import { Link } from "react-router-dom";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const createdDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-violet-900/40 dark:bg-[#12121c]">
      <div>
        <Link
          to={`/projects/${project._id}`}
          className="text-lg font-semibold text-gray-900 hover:text-violet-600 dark:text-gray-100 dark:hover:text-violet-400"
        >
          {project.title}
        </Link>
        {project.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {project.description}
          </p>
        )}
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Created {createdDate}
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(project)}
          className="text-sm font-medium text-violet-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project)}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
