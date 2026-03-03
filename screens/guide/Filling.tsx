import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const FillVolumeCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('filling')} />;
};

export default FillVolumeCostGuide;
