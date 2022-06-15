import { IUser, ListUsers, DataUser } from './../types/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://gorest.co.in/public/v1/',
	}),
	endpoints: build => ({
		fetchAllUsers: build.query<ListUsers<IUser>, any>({
			query: params => ({
				url: 'users',
				params: {
					...params,
					'access-token':
						'd3bc211eb96a196844e577f1e8c31887d97c2ec137490f95f45fa93d68ad54f5',
				},
			}),
		}),
		fetchUser: build.query<DataUser<IUser>, any>({
			query: id => ({
				url: `users/${id}`,
				params: {
					'access-token':
						'd3bc211eb96a196844e577f1e8c31887d97c2ec137490f95f45fa93d68ad54f5',
				},
			}),
		}),
		EditUser: build.mutation<DataUser<IUser>, IUser>({
			query: user => ({
				url: `users/${user.id}`,
				method: 'PUT',
				headers: {
					authorization:
						'Bearer d3bc211eb96a196844e577f1e8c31887d97c2ec137490f95f45fa93d68ad54f5',
				},
				body: JSON.stringify(user),
			}),
		}),
	}),
});
