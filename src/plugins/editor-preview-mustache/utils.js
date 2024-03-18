import * as YAML from 'js-yaml';

const jsonRegExp =
  // eslint-disable-next-line no-control-regex
  /(?<true>^\s*true\s*$)|(?<false>^\s*false\s*$)|(?<null>^\s*null\s*$)|(?<number>^\s*\d+\s*$)|(?<object>^\s*{\s*)|(?<array>^\s*\[\s*)|(?<string>^\s*"(((?=\\)\\(["\\/bfnrt]|u[0-9a-fA-F]{4}))|[^"\\\x00-\x1F\x7F])*"\s*$)/;

const isJson = (value) => {
  return jsonRegExp.test(value);
};

const parse = (value) => {
  if (isJson(value)) {
    return JSON.parse(value);
  }
  return YAML.load(value);
};

export default parse;
