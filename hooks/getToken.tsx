import { Context } from '@/context/Context';
import { useContext, useEffect, useState } from 'react';

const getToken = () => {
  const { token, setToken } = useContext(Context);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }
    }
  }, []);

  return { token, setToken, userId };
};

export default getToken;
