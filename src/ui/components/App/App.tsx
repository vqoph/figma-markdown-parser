import React, { useState } from 'react';
import markdownFileUpload from '../../lib/markdownFileUpload';
import postMessage from '../../lib/postMessage';

async function onUpload(file) {
  if (!file) return;
  try {
    const { name } = file;
    const content = await markdownFileUpload(file);

    postMessage('mi-parse-file', { content, name });
  } catch (e) {
    postMessage('mi-error', { e });
  }
}

export default function App() {
  const [fileBox, setFileBox] = useState<HTMLInputElement | any>(undefined);
  const [disabled, setDisabled] = useState<boolean | any>(true);

  return (
    <div>
      <img src={require('./logo.svg')} />
      <h2>Markdown importer</h2>
      <input
        ref={setFileBox}
        type='file'
        accept='.md'
        onChange={() => setDisabled(!fileBox || !fileBox.files[0])}
      />
      <button
        id='create'
        onClick={() => onUpload(fileBox.files[0])}
        disabled={disabled}
      >
        Upload
      </button>
      <button onClick={() => postMessage('mi-close-plugin')}>Close plugin</button>
    </div>
  );
}
