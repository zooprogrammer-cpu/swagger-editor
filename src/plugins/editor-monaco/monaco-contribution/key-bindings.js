import * as monaco from 'monaco-editor';

const keyBindings = [
  {
    // eslint-disable-next-line no-bitwise
    keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.Space,
    command: 'editor.action.triggerSuggest',
    when: 'textInputFocus',
  },
];

export default keyBindings;
