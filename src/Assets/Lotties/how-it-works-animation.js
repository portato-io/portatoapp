import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from './how-it-works-animation.json';
import { useTranslation } from 'react-i18next';

const LottieAnimation = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (containerRef.current) {
      // Modify animationData based on translations
      const modifiedAnimationData = {
        ...animationData,
        layers: animationData.layers.map((layer) => {
          if (layer.t && layer.t.d.k[0].s.t) {
            // Try to get the translation. If it doesn't exist, use the original text as fallback.
            const originalText = layer.t.d.k[0].s.t;
            const translatedText = t('howItWorksLottie.' + originalText, {
              defaultValue: originalText,
            });

            if (translatedText !== originalText) {
              layer.t.d.k[0].s.t = translatedText;
            }
          }
          return layer;
        }),
      };

      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: modifiedAnimationData,
      });
    }
  }, [t]);

  return <div className="box-radius-style-1" ref={containerRef}></div>;
};

export default LottieAnimation;
