import React from 'react';
import '../App.css';

export default function LoadingModal({ isLoading }) {
  return (
    <div className={`modal ${isLoading ? 'visible' : ''}`}>
      <div className="modalContent">
        <div className="spinner"></div>
        <p className="loadingText">Loading...</p>
      </div>
    </div>
  );
}
