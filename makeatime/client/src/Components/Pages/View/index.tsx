import './index.scss';
import React, { useEffect, useState } from 'react';

interface BackendData {
  users?: string[];
}

const View: React.FC = () => {


  const [backendData, setBackendData] = useState<BackendData>({});
  useEffect(() => {
    fetch("/get_name")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []);




  const [name, setName] = useState("")
  const [postID, setPostId] = useState("");
  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: {name} })
    };
    fetch('http://localhost:4000/post_name', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));
  }, [name]);

  return (
    <>
      <div className='api-response'>
        {typeof backendData.users === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => <p key={i}>{user}</p>)
        )}
      </div>
      <div className='api-response'>
        Look at Console, we are posting!
      </div>
      <div>
          <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
    </>
  );
};

export default View;