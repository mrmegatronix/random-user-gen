/**
 * Universal Signage Font Sizing Engine
 */
(function(window) {
  function fitElement(el, options = {}) {
    if (!el || !el.parentElement) return;
    const maxRem = options.maxRem || 5.8;
    const minRem = options.minRem || 2.0;
    const step = options.step || 0.15;
    const parent = el.parentElement;
    const maxW = parent.clientWidth * (options.widthRatio || 0.96);
    const maxH = parseFloat(getComputedStyle(el).maxHeight) || (parent.clientHeight * 0.42);

    let currentRem = maxRem;
    el.style.fontSize = `${currentRem}rem`;

    while (currentRem > minRem) {
      if (el.scrollWidth <= maxW && el.scrollHeight <= maxH) break;
      currentRem = +(currentRem - step).toFixed(2);
      el.style.fontSize = `${currentRem}rem`;
    }
  }

  function fitContainer(containerEl) {
    if (!containerEl) return;
    const h1s = containerEl.querySelectorAll('.fit-h1');
    h1s.forEach(el => fitElement(el, { maxRem: 5.2, minRem: 2.2, widthRatio: 0.96 }));

    const h2s = containerEl.querySelectorAll('.fit-h2');
    h2s.forEach(el => fitElement(el, { maxRem: 2.6, minRem: 1.3, widthRatio: 0.96 }));

    const vals = containerEl.querySelectorAll('.fit-val');
    vals.forEach(el => fitElement(el, { maxRem: 1.75, minRem: 1.0, widthRatio: 0.96 }));
  }

  window.MatrixAutoFit = { fitElement, fitContainer };
})(typeof window !== 'undefined' ? window : this);
