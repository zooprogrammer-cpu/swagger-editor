import * as monaco from 'monaco-editor';

import { getWorker } from '../apidom-mode.js';

const createCommentsActionDescriptor = ({ getSystem }) => ({
  id: 'add-comment-action',
  label: 'Add/Edit Comment',

  // An optional array of keybindings for the action.
  // eslint-disable-next-line no-bitwise
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyC],
  // A precondition for this action.
  precondition: null,
  // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
  keybindingContext: null,
  contextMenuGroupId: 'navigation', // 1_modification
  contextMenuOrder: 0.5,
  async run(editorInstance) {
    // eslint-disable-next-line no-unused-vars
    const system = getSystem();
    console.log(`Add comment to ${editorInstance.getPosition()}`);
    const model = editorInstance.getModel();
    const worker = await getWorker()(model.uri);
    const pos = {
      line: editorInstance.getPosition().lineNumber - 1,
      character: editorInstance.getPosition().column - 1,
    };
    const storedComment = await worker.getNodeComments(model.uri.toString(), pos);

    const path = storedComment.jsonPointer;
    const hasComments =
      storedComment.keyComments?.length > 0 || storedComment.valueComments?.length > 0;
    let title = `Add a comment to node ${path}`;
    if (hasComments) {
      // eslint-disable-next-line no-restricted-syntax
      for (const c of storedComment.keyComments) {
        title = `${title}\n${c.value}`;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const c of storedComment.valueComments) {
        title = `${title}\n${c.value}`;
      }
    }
    // const storedComment = localStorage.getItem(path);
    const newDefaultComment = `Comment to ${path}`;
    const comment = prompt(title, newDefaultComment);
    console.log('COMMENT', comment);
    if (comment) {
      await worker.addNodeComment(model.uri.toString(), pos, comment);
      system.editorActions.setContent(model.getValue());
      model.setValue(model.getValue());
    }
  },
});

export default createCommentsActionDescriptor;
