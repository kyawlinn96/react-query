import IconOrderStep1 from '../icon/IconOrderStep1';
import IconOrderStep2 from '../icon/IconOrderStep2';
import IconOrderStep3 from '../icon/IconOrderStep3';
import IconOrderStep4 from '../icon/IconOrderStep4';

const useOrderStatus = () => {
  const steps = [
    {
      Icon: <IconOrderStep1 />,
      label: 'Ordered',
    },
    {
      Icon: <IconOrderStep2 />,
      label: 'Packed',
    },
    {
      Icon: <IconOrderStep3 />,
      label: 'Delivering',
    },
    {
      Icon: <IconOrderStep4 />,
      label: 'Delivered',
    },
  ];

  return {
    steps,
  };
};

export default useOrderStatus;
