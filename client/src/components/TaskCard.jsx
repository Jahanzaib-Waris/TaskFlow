const statusStyles = {
  Todo: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

const priorityStyles = {
  Low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  High: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-violet-900/40 dark:bg-[#12121c]">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
        {task.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}>
            {task.status}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-3">
        <button
          onClick={() => onEdit(task)}
          className="text-sm font-medium text-violet-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
