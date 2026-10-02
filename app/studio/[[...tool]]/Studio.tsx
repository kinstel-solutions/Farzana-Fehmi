'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import './studio.css';

export function Studio() {
  return <NextStudio config={config} />;
}
