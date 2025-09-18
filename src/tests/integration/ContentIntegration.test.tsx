import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Home from '../../pages/index';

describe('Content Integration', () => {
  test('renders content after fetching', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Sample post/i)).toBeInTheDocument(); // From mock social API
    });
  });
});