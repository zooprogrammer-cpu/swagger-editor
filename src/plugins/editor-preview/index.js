import EditorPreviewPane from './components/EditorPreviewPane.jsx';
import EditorPreviewFallback from './components/EditorPreviewFallback.jsx';

const EditorPreviewPlugin = () => ({
  components: {
    EditorPreviewFallback,
    EditorPreviewPane,
    EditorPreview: EditorPreviewFallback,
  },
});

export default EditorPreviewPlugin;
