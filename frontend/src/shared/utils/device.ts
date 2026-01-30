export const isMobile = () => {
    const ua = navigator.userAgent;
    const isMobileOS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isIpad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
    return isMobileOS || isIpad;
};
