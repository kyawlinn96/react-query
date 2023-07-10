import { dispatch } from '@/utils/eventBus';

const toaster = {
  show: (message: string) => {
    dispatch('toast', message);
  },
};

export default toaster;
