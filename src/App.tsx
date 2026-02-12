import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <div className="min-h-screen min-w-[280px] bg-gray-100 overflow-x-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
