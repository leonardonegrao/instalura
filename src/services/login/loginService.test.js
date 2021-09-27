import { loginService } from './loginService';

const token = 'fake-token';
async function HttpClientModule() {
  return {
    data: { token },
  };
}
async function HttpClientModuleError() {
  return {
    data: {},
    err: { message: 'Failed to login' },
  };
}

describe('loginService', () => {
  describe('login()', () => {
    describe('when user try to login', () => {
      describe('and succeeds', () => {
        test('store their token', async () => {
          const setCookie = jest.fn();

          const loginServiceResponse = await loginService.login(
            {
              username: 'someusername',
              password: 'somepassword',
            },
            setCookie,
            HttpClientModule,
          );

          expect(setCookie).toHaveBeenCalledWith(
            null,
            'APP_TOKEN',
            token,
            { path: '/', maxAge: 604800 },
          );
          expect(loginServiceResponse).toEqual({ token });
        });
      });

      describe('and fails', () => {
        test('throws an error', async () => {
          const setCookie = jest.fn();

          await expect(loginService.login(
            {
              username: 'someusername',
              password: 'somepassword',
            },
            setCookie,
            HttpClientModuleError,
          )).rejects.toThrow('Failed to login');
        });
      });
    });
  });

  describe('logout()', () => {
    describe('when user try to logout and succeeds', () => {
      const destroyCookie = jest.fn();

      test('remove their token', async () => {
        await loginService.logout(destroyCookie);

        expect(destroyCookie).toHaveBeenCalledWith(null, 'APP_TOKEN');
      });
    });
  });
});
