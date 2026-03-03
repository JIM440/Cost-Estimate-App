import React from 'react';
import GuideDetail from '../../components/guides/GuideDetail';
import { getGuideContent } from './guideContent';

const FormworkCostGuide: React.FC = () => {
  return <GuideDetail content={getGuideContent('formwork')} />;
};

export default FormworkCostGuide;
