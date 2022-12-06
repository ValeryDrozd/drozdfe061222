import { act } from 'react-dom/test-utils';
import UserWidget from '../UserWidget';
import { fireEvent, render, screen } from '@testing-library/react';
import User from '../../../interfaces/User.interface';

const testUser: User = {
  phone: '902-738-3242',
  name: 'Geordan Aaryn',
  nickname: '@geordanaaryn',
  email: 'geordan.aaryn@fallinhay.com',
  position: 'Chief Executive Officer',
  photo: '1.jpg',
};

describe('UserWidget', () => {
  it('top section is shown correctly', () => {
    const { container } = render(
      <UserWidget onClose={() => {}} user={testUser} />,
    );

    const title = container.getElementsByClassName('title').item(0);
    const subtitle = container.getElementsByClassName('subtitle').item(0);
    expect(title).toHaveTextContent(testUser.name);
    expect(subtitle).toHaveTextContent(testUser.position);
  });

  it('onClose works correctly', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <UserWidget onClose={mockOnClose} user={testUser} />,
    );

    const closeIcon = container.getElementsByClassName('close-icon').item(0);
    act(() => {
      fireEvent(
        closeIcon as Element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
