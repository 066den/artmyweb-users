import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserEditPage from '../../pages/UserEditPage';
import UsersPage from '../../pages/UsersPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/users' element={<UsersPage />} />
      <Route path='/edit/:id' element={<UserEditPage />} />
      <Route path='/' element={<Navigate replace to='/users' />} />
    </Routes>
  );
};

export default AppRouter;
