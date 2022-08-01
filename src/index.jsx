import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import EditorContentTypePlugin from './plugins/editor-content-type/index.js';
import EditorPreviewAsyncAPIPlugin from './plugins/editor-preview-asyncapi/index.js';
import EditorPreviewAPIDesignSystemsPlugin from './plugins/editor-preview-api-design-systems/index.js';
import SwaggerUIAdapterPlugin from './plugins/swagger-ui-adapter/index.js';

const plugins = [
  EditorContentTypePlugin,
  EditorPreviewAsyncAPIPlugin,
  EditorPreviewAPIDesignSystemsPlugin,
  SwaggerUIAdapterPlugin,
];

const SwaggerUIPreview = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : globalThis; // eslint-disable-line no-undef

    window.addEventListener('message', (event) => {
      const { data: message } = event;
      switch (message.command) {
        case 'preview': {
          const newSpec = JSON.parse(message.text);
          setSpec(newSpec);
          break;
        }
        default: {
          break;
        }
      }
    });
    vscode.postMessage({ command: 'init' });
  }, []);

  if (spec === null) {
    return null;
  }

  return <SwaggerUI plugins={plugins} spec={spec} />;
};

ReactDOM.render(<SwaggerUIPreview />, document.getElementById('root'));
