import Modal from "./Modal.jsx";

// Confirmation dialog shown before destructive admin actions (deleting a product)
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-ink/70 font-body mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-sm font-body font-semibold hover:bg-red-700 transition-colors"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
