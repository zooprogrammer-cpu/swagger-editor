/**
 * Action types.
 */
export const EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED =
  'editor_preview_mustache_preview_unmounted';

export const EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT = 'editor_preview_mustache_set_context';

/**
 * Action creators.
 */

export const previewUnmounted = () => ({
  type: EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED,
});

export const setContext = ({ context }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT,
  payload: context,
});
