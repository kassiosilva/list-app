import React from 'react';

import app from '../../services/firebase';

const LogOut = () => {
  const logOutUser = () => {
    app.auth().signOut();
  };

  return (
    <button type="button" onClick={logOutUser} className="btn btn-primary">
      Sair
    </button>
  );
};

export default LogOut;
