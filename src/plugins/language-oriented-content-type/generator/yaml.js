import YAML from 'js-yaml';

import generateOpenAPI from './index.js';

export default function generateOpenAPIYAML(tailored) {
  const spec = generateOpenAPI(tailored);

  return YAML.dump(spec);
}
