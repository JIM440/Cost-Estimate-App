import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const RCEstimateGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('rcslab')} />;
};

export default RCEstimateGuide;
