import {useEffect, useState} from 'react';

const useResize = () => {
  const [trigger, setTrigger] = useState(0.1);
  useEffect(() => {
    const handler = () => setTrigger(Math.random());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  return trigger;
};

export default useResize;

