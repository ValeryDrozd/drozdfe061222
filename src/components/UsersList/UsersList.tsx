import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../interfaces/User.interface';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUsers } from '../../store/usersSlice';
import Spinner from '../Spinner/Spinner';
import UserWidget from '../UserWidget/UserWidget';
import './index.css';

export default function UsersList(): JSX.Element {
  const { loading, users } = useSelector((state: RootState) => state.users);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewAll, setViewAll] = useState(false);

  const currentUsers = viewAll ? users : users?.slice(0, 3);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {!loading && <Spinner />}
      {!!currentUser && (
        <UserWidget onClose={() => setCurrentUser(null)} user={currentUser} />
      )}
      <div className="users-list">
        {currentUsers?.map((user) => (
          <div key={`user-${user.nickname}`} className="user-card">
            <img alt="avatar" className="avatar" src={'foto/' + user.photo} />
            <div className="user-info">
              <span className="title">{user.name}</span>
              <span className="subtitle">{user.nickname}</span>
            </div>
            <button
              className="view-button"
              onClick={() => setCurrentUser(user)}
            >
              View
            </button>
          </div>
        ))}
        {!viewAll && (
          <button className="view-all-button" onClick={() => setViewAll(true)}>
            View All
          </button>
        )}
      </div>
    </>
  );
}
