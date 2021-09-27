import React from 'react';
import user from '@testing-library/user-event';
import FormLogin from './index';
import {
  render, act, screen, waitFor,
} from '../../../infra/tests/testUtils';

const onSubmitMock = jest.fn();
onSubmitMock.mockImplementation((event) => {
  event.preventDefault();
});

describe('<FormLogin />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => render(
        <FormLogin
          onSubmit={onSubmitMock}
        />,
      ));

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();

      const inputUser = screen.getByPlaceholderText('Usuário');
      user.type(inputUser, 'username');
      await waitFor(() => expect(inputUser).toHaveValue('username'));

      const inputPassword = screen.getByPlaceholderText('Senha');
      user.type(inputPassword, 'password');
      await waitFor(() => expect(inputPassword).toHaveValue('password'));

      expect(submitButton).not.toBeDisabled();

      user.click(submitButton);
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when form fields are invalid', () => {
    test('displays the respective errors', async () => {
      render(<FormLogin onSubmit={onSubmitMock} />);

      const inputUser = screen.getByPlaceholderText('Usuário');
      inputUser.focus();
      inputUser.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent('Preencha ao menos 3 caracteres');
    });
  });
});
