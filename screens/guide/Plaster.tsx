import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const PlasteringCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('plaster')} />;
};

export default PlasteringCostGuide;
