import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../../infra/tests/testUtils';

import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Mario"
        onChange={() => {}}
        name="nome"
      />,
    );

    const textField = screen.getByPlaceholderText(/nome/i);

    expect(textField).toMatchSnapshot();
  });
});

describe('when field is valid', () => {
  describe('and user is typing', () => {
    test('the value must be updated', () => {
      const onChangeMock = jest.fn();

      render(
        <TextField
          placeholder="Usuário"
          value=""
          onChange={onChangeMock}
          name="user"
        />,
      );

      const textField = screen.getByPlaceholderText(/usuário/i);

      const value = 'omariosouto';
      const valueLength = value.length;
      user.type(textField, value);

      expect(onChangeMock).toHaveBeenCalledTimes(valueLength);
    });
  });
});

describe('when field is invalid', () => {
  test('displays the respective error message', () => {
    render(
      <TextField
        placeholder="Email"
        value="devsoutinhogmail.com"
        onChange={() => {}}
        name="email"
        isTouched
        error="O campo email deve conter um e-mail válido"
      />,
    );

    const textField = screen.getByPlaceholderText(/email/i);
    const errorSpan = screen.getByRole('alert');

    expect(textField).toHaveValue('devsoutinhogmail.com');
    expect(errorSpan).toHaveTextContent('O campo email deve conter um e-mail válido');
    expect(textField).toMatchSnapshot();
  });
});
