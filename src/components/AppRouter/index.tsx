import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserEditPage from '../../pages/UserEditPage';
import UsersPage from '../../pages/UsersPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<UsersPage />} />
      <Route path='/edit/:id' element={<UserEditPage />} />
    </Routes>
  );
};

export default AppRouter;
