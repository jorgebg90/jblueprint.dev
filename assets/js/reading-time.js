/**
 * ReadingTime
 *
 * Deterministic reading-time estimator based on the average adult silent
 * reading speed of 238 words per minute (Brysbaert et al., 2019,
 * "How many words do we read per minute?", Journal of Memory and Language).
 *
 * Formula: Math.ceil(wordCount / WPM)   → minimum 1 min
 */
class ReadingTime {
  static WPM = 238;

  /**
   * Count words in a plain-text string.
   * Strips HTML tags first, then splits on whitespace runs.
   * @param {string} text
   * @returns {number}
   */
  static countWords(text) {
    return text
      .replace(/<[^>]+>/g, ' ')   // strip HTML tags
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 0)
      .length;
  }

  /**
   * Calculate reading time for a given word count.
   * @param {number} wordCount
   * @returns {number} minutes (≥ 1)
   */
  static calculate(wordCount) {
    return Math.max(1, Math.ceil(wordCount / ReadingTime.WPM));
  }

  /**
   * Format reading time into a localised string.
   * @param {number} minutes
   * @param {string} lang  - 'en' | 'es'
   * @returns {string}
   */
  static format(minutes, lang = 'en') {
    const labels = {
      en: { icon: 'far fa-clock', min: 'min read' },
      es: { icon: 'far fa-clock', min: 'min de lectura' },
    };
    const { icon, min } = labels[lang] || labels.en;
    return `<i class="${icon}" aria-hidden="true"></i> ${minutes} ${min}`;
  }

  /**
   * Inject reading-time badge into a target element from a content element.
   * @param {HTMLElement} contentEl  - element whose text is measured
   * @param {HTMLElement} badgeEl    - element that receives the badge HTML
   * @param {string}      lang
   */
  static inject(contentEl, badgeEl, lang) {
    if (!contentEl || !badgeEl) return;
    const wordCount = ReadingTime.countWords(contentEl.innerText || contentEl.textContent || '');
    const minutes   = ReadingTime.calculate(wordCount);
    badgeEl.innerHTML = ReadingTime.format(minutes, lang);
  }
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const badge   = document.getElementById('reading-time-badge');
  const content = document.querySelector('.page__content');
  const lang    = document.documentElement.lang || 'en';
  ReadingTime.inject(content, badge, lang);
});

