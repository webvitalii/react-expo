import { RouterProvider } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { store } from '@/state/store.ts';
import { router } from '@/router';
import '@/App.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
