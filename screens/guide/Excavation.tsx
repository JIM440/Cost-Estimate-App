import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const ExcavationCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('excavation')} />;
};

export default ExcavationCostGuide;
