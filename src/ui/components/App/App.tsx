import React, { useState } from 'react';
import markdownFileUpload from '../../lib/markdownFileUpload';
import postMessage from '../../lib/postMessage';

export default function App() {
  let fileBox: HTMLInputElement;
  [fileBox] = useState(undefined);

  const onUpload = async () => {
    try {
      const content = fileBox.files[0]
        ? await markdownFileUpload(fileBox.files[0])
        : undefined;
      postMessage('mi-parse-file', { content });
    } catch (e) {
      postMessage('mi-error', { e });
    }
  };

  return (
    <div>
      <img src={require('./logo.svg')} />
      <h2>Markdown importer</h2>
      <input ref={el => (fileBox = el)} type='file' accept='.md' />
      <button id='create' onClick={onUpload}>
        Upload
      </button>
      <button onClick={() => postMessage('mi-close-plugin')}>Close plugin</button>
    </div>
  );
}
