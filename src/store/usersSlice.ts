import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from '../interfaces/User.interface';
import { getUsers } from '../services/users.service';

const LOCAL_STORAGE_CITIES_KEY = 'cities';

export const getCitiesFromLocalStorage = (): string[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_CITIES_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_CITIES_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(data);
};

interface UsersState {
  users: User[] | null;
  loading: boolean;
}

const initialState: UsersState = {
  users: null,
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.loading = false;
    });
  },
});

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();
    return users;
  },
);

export default usersSlice.reducer;
