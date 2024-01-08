import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from './how-it-works-animation.json';
import { useTranslation } from 'react-i18next';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';

const LottieAnimation = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const textToKeyMapping = {
    // German mappings
    'Fahrer:in registriert route': 'Driver registers route',
    'Sender:in/Empfänger:in \rerstellt Auftrag':
      'Sender/receiver creates request',
    'Portato verbindet die beiden': 'Portato connects both',
    'Fahrer:in holt \rdie Gegenstände ab ...': 'Driver picks up items ...',
    '... liefert sie ab ...': '... delivers them to receiver ...',
    '... und wird bezahlt.': '... and gets paid.',

    // French mappings
    "Le conducteur enregistre l'itinéraire": 'Driver registers route',
    "L'expéditeur/récepteur crée \rune demande":
      'Sender/receiver creates request',
    'Portato relie les deux': 'Portato connects both',
    'Le conducteur récupère \rles objets ...': 'Driver picks up items ...',
    '... les livre au récepteur ...': '... delivers them to receiver ...',
    '... et est payé.': '... and gets paid.',

    // ... add other language mappings as needed
  };

  useEffect(() => {
    if (containerRef.current) {
      // Modify animationData based on translations
      const modifiedAnimationData = {
        ...animationData,
        layers: animationData.layers.map((layer) => {
          if (layer.t && layer.t.d.k[0].s.t) {
            // Try to get the translation. If it doesn't exist, use the original text as fallback.
            const originalText = layer.t.d.k[0].s.t;
            const key = textToKeyMapping[originalText] || originalText;
            const translatedText = t('howItWorksLottie.' + key, {
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
