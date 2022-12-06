import { act } from 'react-dom/test-utils';
import UsersList from '../UsersList';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import User from '../../../interfaces/User.interface';
import { Provider } from 'react-redux';
import * as usersService from '../../../services/users.service';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../../store/store';

const testUsers: User[] = [
  {
    phone: '902-738-3242',
    name: 'Geordan Aaryn',
    nickname: '@geordanaaryn',
    email: 'geordan.aaryn@fallinhay.com',
    position: 'Chief Executive Officer',
    photo: '1.jpg',
  },
  {
    phone: '902-782-3286',
    name: 'Brazil Izair',
    nickname: '@brazilizair',
    email: 'brazil.izair@fallinhay.com',
    position: 'Managing Director',
    photo: '2.jpg',
  },
  {
    phone: '902-739-3333',
    name: 'Selman Winston',
    nickname: '@selmanwinston',
    email: 'selman.winston@fallinhay.com',
    position: 'Chief Visionary Officer',
    photo: '3.jpg',
  },
  {
    phone: '902-784-3378',
    name: 'Kaine Dutch',
    nickname: '@kainedutch',
    email: 'kaine.dutch@fallinhay.com',
    position: 'Chief Financial Officer',
    photo: '4.jpg',
  },
];

describe('UsersList', () => {
  let mockGetUsers: jest.SpyInstance;
  beforeEach(() => {
    mockGetUsers = jest
      .spyOn(usersService, 'getUsers')
      .mockImplementationOnce(() => Promise.resolve(testUsers));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setupTest = async (): Promise<HTMLElement> => {
    let container: HTMLElement;
    await act(async () => {
      container = render(
        <Provider store={store}>
          <UsersList />
        </Provider>,
      ).container;
    });

    await waitFor(() => expect(mockGetUsers).toHaveBeenCalledTimes(1));
    // @ts-ignore
    return container;
  };

  it('list is shown correctly', async () => {
    const container = await setupTest();

    const list = container.getElementsByClassName('users-list');
    expect(list).toHaveLength(1);
  });

  it('list should have only 3 items', async () => {
    const container = await setupTest();

    const cards = container.getElementsByClassName('user-card');
    expect(cards).toHaveLength(3);

    const viewAllButton = container.getElementsByClassName('view-all-button');
    expect(viewAllButton).toHaveLength(1);
  });

  it('list should have only 3 items', async () => {
    const container = await setupTest();
    const viewAllButton = container
      .getElementsByClassName('view-all-button')
      .item(0);

    act(() => {
      fireEvent(
        viewAllButton as Element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    const cards = container.getElementsByClassName('user-card');
    expect(cards).toHaveLength(4);
  });
});
