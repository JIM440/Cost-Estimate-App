import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const RodCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('rods')} />;
};

export default RodCostGuide;
