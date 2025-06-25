import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vercel.com/analytics/script.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default Analytics;
