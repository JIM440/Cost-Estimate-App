import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const FoundationCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('foundation')} />;
};

export default FoundationCostGuide;
