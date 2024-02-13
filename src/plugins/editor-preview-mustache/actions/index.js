/**
 * Action types.
 */
export const EDITOR_PREVIEW_MUSTACHE_PREVIEW_MOUNTED = 'editor_preview_mustache_preview_mounted';

export const EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED =
  'editor_preview_mustache_preview_unmounted';

export const EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT = 'editor_preview_mustache_set_context';

/**
 * Action creators.
 */

export const previewMounted = () => ({
  type: EDITOR_PREVIEW_MUSTACHE_PREVIEW_MOUNTED,
});

export const previewUnmounted = () => ({
  type: EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED,
});

export const setContext = ({ context, origin }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT,
  payload: context,
  meta: {
    origin,
  },
});
