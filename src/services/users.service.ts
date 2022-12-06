import User from '../interfaces/User.interface';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch('/initData.json');
  const users = await res.json();

  return users as User[];
};
