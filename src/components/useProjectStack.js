import { useEffect } from 'react';

// Scale, blur, and fade each sticky project card as the next one slides over it.
export function useProjectStack(cardRefs) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stackFrame = 0;

    const updateProjectStack = () => {
      stackFrame = 0;
      if (reduceMotion.matches) return;

      const projectCards = cardRefs.current.filter(Boolean);
      projectCards.forEach((card, index) => {
        const nextCard = projectCards[index + 1];
        const stickyTop = parseFloat(window.getComputedStyle(card).top) || 64;
        const animationStart = stickyTop + 240;
        const nextTop = nextCard ? nextCard.getBoundingClientRect().top : animationStart;
        const stackProgress = Math.max(0, Math.min(1, (animationStart - nextTop) / (animationStart - stickyTop)));
        const scale = 1 - stackProgress * 0.045;
        const blur = stackProgress * 5;
        const opacity = 1 - stackProgress;
        card.style.setProperty('--stack-scale', scale.toFixed(3));
        card.style.setProperty('--stack-blur', blur.toFixed(2) + 'px');
        card.style.setProperty('--stack-opacity', opacity.toFixed(3));
      });
    };

    const requestProjectStackUpdate = () => {
      if (!stackFrame) stackFrame = window.requestAnimationFrame(updateProjectStack);
    };

    window.addEventListener('scroll', requestProjectStackUpdate, { passive: true });
    window.addEventListener('resize', requestProjectStackUpdate);
    reduceMotion.addEventListener?.('change', requestProjectStackUpdate);
    requestProjectStackUpdate();

    return () => {
      window.removeEventListener('scroll', requestProjectStackUpdate);
      window.removeEventListener('resize', requestProjectStackUpdate);
      reduceMotion.removeEventListener?.('change', requestProjectStackUpdate);
      if (stackFrame) window.cancelAnimationFrame(stackFrame);
    };
  }, [cardRefs]);
}
