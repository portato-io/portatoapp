import { TFunction } from 'i18next';

export const getConstants = (t: TFunction) => ({
  DAYS: [
    {
      label: t('dayAbbreviated.monday'),
      value: 'Mon',
    },
    {
      label: t('dayAbbreviated.tuesday'),
      value: 'Tue',
    },
    {
      label: t('dayAbbreviated.wednesday'),
      value: 'Wed',
    },
    {
      label: t('dayAbbreviated.thursday'),
      value: 'Thu',
    },
    {
      label: t('dayAbbreviated.friday'),
      value: 'Fri',
    },
    {
      label: t('dayAbbreviated.saturday'),
      value: 'Sat',
    },
    {
      label: t('dayAbbreviated.sunday'),
      value: 'Sun',
    },
  ],

  TIME: [
    {
      label: t('timeOfDay.morning'),
      value: 'Morning',
    },
    {
      label: t('timeOfDay.midDay'),
      value: 'Mid-day',
    },
    {
      label: t('timeOfDay.evening'),
      value: 'Evening',
    },
  ],

  CAPACITY_OPTIONS: [
    {
      label: 'S',
      description: t('capacity.s'),
      value: 'S',
    },
    {
      label: 'M',
      description: t('capacity.m'),
      value: 'M',
    },
    {
      label: 'L',
      description: t('capacity.l'),
      value: 'L',
    },
    {
      label: 'XL',
      description: t('capacity.xl'),
      value: 'XL',
    },
  ],

  LANGUAGE_OPTIONS: [
    {
      label: t('settings.english'),
      value: 'en_US',
    },
    {
      label: t('settings.french'),
      value: 'fr_FR',
    },
    {
      label: t('settings.german'),
      value: 'de_DE',
    },
  ],
});

export const MAP_ZOOM_OFFSET = 0.01;
