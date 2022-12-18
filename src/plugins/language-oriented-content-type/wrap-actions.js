import YAML from 'js-yaml';

import generateOpenAPIYAML from './generator/yaml.js';
import generateOpenAPIJSON from './generator/json.js';

const detectionRegExpTailoredADL =
  /(?<YAML>^(["']?)name\2\s*:\s*(["']?)(?<name_yaml>tailoredADL)\3(?:\s+|$))|(?<JSON>"name"\s*:\s*"(?<name_json>tailoredADL)")/m;

// eslint-disable-next-line import/prefer-default-export
export const detectContentTypeSuccess = (oriAction, system) => (payload) => {
  const { editorActions, fn } = system;

  // tailored ADL in YAML projection
  if (payload.contentType === 'text/yaml') {
    const tailoredADLMatch = payload.content.match(detectionRegExpTailoredADL);

    if (tailoredADLMatch !== null && fn.isValidYAMLObject(payload.content)) {
      const contentType = `application/vnd.oai.openapi+yaml;version=3.0.3`;
      const parseResult = YAML.load(payload.content);

      return editorActions.detectContentTypeSuccess({
        ...payload,
        contentType,
        content: generateOpenAPIYAML(parseResult),
      });
    }
  }

  // tailored ADL in JSON projection
  if (payload.contentType === 'application/json') {
    const tailoredADLMatch = payload.content.match(detectionRegExpTailoredADL);

    if (tailoredADLMatch !== null && fn.isValidJSONObject(payload.content)) {
      const contentType = `application/vnd.oai.openapi+json;version=3.0.3`;
      const parseResult = JSON.parse(payload.content);

      return editorActions.detectContentTypeSuccess({
        ...payload,
        contentType,
        content: generateOpenAPIJSON(parseResult),
      });
    }
  }

  return oriAction(payload);
};
