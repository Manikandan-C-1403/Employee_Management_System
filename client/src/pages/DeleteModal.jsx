import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <FiTrash2 className="delete-icon" />

        <h6 className="delete-title">
          Are you sure you want <br /> to Delete?
        </h6>

        <div className="delete-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="yes-btn" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
