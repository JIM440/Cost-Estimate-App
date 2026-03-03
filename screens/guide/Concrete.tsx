import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const ConcreteCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('concrete')} />;
};

export default ConcreteCostGuide;
