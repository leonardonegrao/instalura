import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const initialValues = { nome: 'Mario' };

      const { result } = renderHook(() => useForm({ initialValues }));

      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'Ju',
        },
      };

      act(() => { result.current.handleChange(event); });

      expect(result.current.values).toEqual({ nome: 'Ju' });
    });
  });
});
