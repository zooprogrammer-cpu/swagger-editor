import * as YAML from 'js-yaml';

export const parseContext = (context) => {
  try {
    return JSON.parse(context);
  } catch {
    return YAML.load(context);
  }
};

export const stringifyContext = (context) => YAML.dump(context);
