import * as YAML from 'js-yaml';

// eslint-disable-next-line import/prefer-default-export
export const parseContext = (context) => {
  try {
    return JSON.parse(context);
  } catch {
    return YAML.load(context);
  }
};
