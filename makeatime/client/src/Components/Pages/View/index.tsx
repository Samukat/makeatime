import './index.scss';
import React, { useEffect, useState } from 'react';

interface BackendData {
  users?: string[];
}

const View: React.FC = () => {
  const [backendData, setBackendData] = useState<BackendData>({});

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []);

  return (
    <>
      <div className='api-response'>
        {typeof backendData.users === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => <p key={i}>{user}</p>)
        )}
      </div>
    </>
  );
};

export default View;