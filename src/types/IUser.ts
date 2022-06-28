export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface IQuery {
  page: number;
  total: number;
}

export interface IPagination {
  pagination: IQuery;
}

export interface DataUser<IUser> {
  meta: IPagination;
  data: IUser;
}

export interface ListUsers<IUser> {
  meta: IPagination;
  data: IUser[];
}
