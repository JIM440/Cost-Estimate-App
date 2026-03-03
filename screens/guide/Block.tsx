import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const BlocksCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('block')} />;
};

export default BlocksCostGuide;
