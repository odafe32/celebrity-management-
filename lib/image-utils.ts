/**
 * Shared image utilities for optimized loading.
 */

/**
 * A tiny transparent blur placeholder (1x1 px, base64).
 * Used as `blurDataURL` for remote images so they show a
 * subtle shimmer instead of a blank box while loading.
 */
export const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

/**
 * Standard sizes attribute for celebrity card grids.
 * Tells the browser how wide the image will be at each breakpoint
 * so it downloads the right resolution — no wasted bytes.
 */
export const CARD_SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

/**
 * Standard sizes attribute for a single profile photo.
 */
export const PROFILE_SIZES = "160px";
