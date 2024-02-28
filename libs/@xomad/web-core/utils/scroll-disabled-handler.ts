const preventDefault = (e) => e.preventDefault();
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const preventDefaultForScrollKeys = (e) => {
  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
  return true;
};

export class XoScrollDisabledHandler {
  static lockScroll = () => {
    window.addEventListener('DOMMouseScroll', preventDefault, { passive: false }); // older FF
    window.addEventListener(wheelEvent, preventDefault, { passive: false }); // modern desktop
    window.addEventListener('touchmove', preventDefault, { passive: false }); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, { passive: false });
    document.body.style.overflow = 'hidden';
  }

  static releaseScroll = () => {
    window.removeEventListener('DOMMouseScroll', preventDefault, { passive: false } as any);
    window.removeEventListener(wheelEvent, preventDefault, { passive: false } as any);
    window.removeEventListener('touchmove', preventDefault, { passive: false } as any);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, { passive: false } as any);
    document.body.style.overflow = 'auto';
  }
}
