import React, { useContext } from "react";
import { User } from "lucide-react";
import "./UserModal.css";
import { AuthContext } from "react-oauth2-code-pkce";

const UserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { tokenData, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    logOut();
    localStorage.clear();
    window.location.href = "/";
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <div className="modal-avatar">
            <User size={32} />
          </div>
          <h2 className="modal-title">User Profile</h2>
        </div>
        <div className="modal-content">
          <div className="user-info">
            <label>Name</label>
            <p>{tokenData?.name}</p>
          </div>
          <div className="user-info">
            <label>Email</label>
            <p>{tokenData?.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserModal;
