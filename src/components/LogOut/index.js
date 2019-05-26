import React from 'react';

import app from '../../services/firebase';

const LogOut = () => {
  const logOutUser = () => {
    app.auth().signOut();
  };

  return (
    <button onClick={logOutUser} type="button">
      Sair
    </button>
  );
};

export default LogOut;
