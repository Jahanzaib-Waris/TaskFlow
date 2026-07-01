import Modal from "./Modal";

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmLabel = "Delete" }) => {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
