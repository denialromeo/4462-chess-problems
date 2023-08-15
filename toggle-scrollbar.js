// Key codes for navigation and control
const SCROLL_KEYS = {
  'ArrowLeft': 1, 'ArrowUp': 1, 'ArrowRight': 1, 'ArrowDown': 1,
  'PageUp': 1, 'PageDown': 1, 'End': 1, 'Home': 1, ' ': 1 // Spacebar
};

// Detect wheel event and passive support
const WHEEL_EVENT = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const WHEEL_OPT = (() => {
  let supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', { get: () => supportsPassive = true }));
  } catch (e) {}
  return supportsPassive ? { passive: false } : false;
})();

// Prevent default behavior
function preventDefault(e) {
  e.preventDefault();
}

// Prevent default behavior for scroll keys
function preventDefaultForScrollKeys(e) {
  if (SCROLL_KEYS[e.key]) {
    preventDefault(e);
    return false;
  }
}

// Register event listeners
function registerListeners(action) {
  const method = action === 'add' ? 'addEventListener' : 'removeEventListener';
  window[method]('DOMMouseScroll', preventDefault, false); // older FF
  window[method](WHEEL_EVENT, preventDefault, WHEEL_OPT); // modern desktop
  window[method]('touchmove', preventDefault, WHEEL_OPT); // mobile
  window[method]('keydown', preventDefaultForScrollKeys, false);
}

// Disable scrolling
function disableScroll() {
  registerListeners('add');
}

// Enable scrolling
function enableScroll() {
  registerListeners('remove');
}

// Exports
module.exports = {
  enableScroll,
  disableScroll
};