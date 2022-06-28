import { apiUser } from './../constants/index';
import { IUser, ListUsers, DataUser } from './../types/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUser.API_URL,
  }),
  endpoints: build => ({
    fetchAllUsers: build.query<ListUsers<IUser>, any>({
      query: params => ({
        url: 'users',
        params: {
          ...params,
          'access-token': apiUser.API_TOKEN,
        },
      }),
    }),
    fetchUser: build.query<DataUser<IUser>, any>({
      query: id => ({
        url: `users/${id}`,
        params: {
          'access-token': apiUser.API_TOKEN,
        },
      }),
    }),
    EditUser: build.mutation<DataUser<IUser>, IUser>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${apiUser.API_TOKEN}`,
        },
        body: user,
      }),
    }),
  }),
});
