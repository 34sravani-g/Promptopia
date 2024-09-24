'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className='error-page'>
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <button onClick={() => {
            reset();
            window.location.reload();
          }}>
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
