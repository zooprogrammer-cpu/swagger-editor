import generateOpenAPI from './index.js';

export default function generateOpenAPIJSON(tailored) {
  const spec = generateOpenAPI(tailored);

  return JSON.stringify(spec);
}
