import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const RoofingEstimateGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('roofing')} />;
};

export default RoofingEstimateGuide;
