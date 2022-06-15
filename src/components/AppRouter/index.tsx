import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserEdit from '../../pages/UserEdit';
import Users from '../../pages/Users';

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate replace to='/users' />} />
			<Route path='/users' element={<Users />} />
			<Route path='/edit/:id' element={<UserEdit />} />
		</Routes>
	);
};

export default AppRouter;
