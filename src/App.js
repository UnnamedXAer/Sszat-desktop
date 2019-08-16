import React, { useState, useEffect } from 'react';
import classes from './App.module.css';

function App() {

  const [title, setDocumentTitle] = useState('sszat');

  useEffect(() => {
    const _title = `sszat -- ${new Date()}`;
    setDocumentTitle(_title);
    document.title = _title;
  }, [title]);

  return (
    <div className={classes.App}>
      {title}
    </div>
  );
}

export default App;