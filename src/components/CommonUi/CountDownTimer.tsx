import React, { useState, useEffect } from 'react';

type timerProps = {
  title: string;
  time: number;
};
type dateProps = {
  endDate: string;
};
const TimerBox: React.FC<timerProps> = ({ title, time }) => (
  <div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-md  bg-[#00000050] py-2 text-white'>
    <div className='absolute top-0 h-[30%] w-full bg-[#00000065]' />
    <p className='text-base font-bold'>{time}</p>
    <p className='text-base font-medium'>{title}</p>
  </div>
);
const Divider = () => (
  <div className='flex flex-col items-center justify-center gap-2'>
    <div className='h-1 w-1 bg-white' />
    <div className='h-1 w-1 bg-white' />
  </div>
);

const CountdownTimer: React.FC<dateProps> = (endDate) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endTime = new Date(endDate?.endDate); // set the end time for the sale
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = endTime.getTime() - currentTime.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate?.endDate]);

  const { days, hours, minutes, seconds } = remainingTime;

  return (
    <div className='flex h-full  w-full gap-1'>
      <TimerBox time={days} title='day' />
      <Divider />
      <TimerBox time={hours} title='hr' />
      <Divider />
      <TimerBox time={minutes} title='min' />
      <Divider />
      <TimerBox time={seconds} title='sec' />
    </div>
  );
};

export default CountdownTimer;
