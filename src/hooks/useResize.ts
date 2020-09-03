import {useEffect, useState} from 'react';

export default () => {
  const [trigger, setTrigger] = useState(0.1);
  useEffect(() => {
    const handler = () => setTrigger(Math.random());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  return trigger;
};
