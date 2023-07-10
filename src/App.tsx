import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './router';
import { Toast } from './components/ui/Toast';

const App = () => {
  const queryClient = new QueryClient();
  const contextClass = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-sky-500',
    warning: 'bg-orange-400',
    default: 'bg-indigo-500',
    dark: 'bg-white-500 font-gray-300',
  };

  return (
    <>
      <ToastContainer
        toastClassName={(toastClass) =>
          contextClass[toastClass?.type || 'default'] +
          ' relative text-sm flex min-h-10 justify-between overflow-hidden cursor-pointer mb-4 p-2'
        }
        transition={Zoom}
        theme='colored'
        hideProgressBar
        autoClose={1500}
      />
      <Toast />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
