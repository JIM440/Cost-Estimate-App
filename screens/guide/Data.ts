import React from 'react';
import BlockIcon from '../../assets/images/individual_estiamte/block.svg';
import ConcreteIcon from '../../assets/images/individual_estiamte/concrete.svg';
import RodIcon from '../../assets/images/individual_estiamte/rod.svg';
import ExcavationIcon from '../../assets/images/individual_estiamte/excavation.svg';
import FillingIcon from '../../assets/images/individual_estiamte/filling.svg';
import TilesIcon from '../../assets/images/individual_estiamte/tiles.svg';
import PaintIcon from '../../assets/images/individual_estiamte/paint.svg';
export interface GuideConfig {
  id: number;
  titleKey: string;
  route: string;
  iconSource: number | React.ComponentType<any>;
}

const guides: GuideConfig[] = [
  { id: 1, titleKey: 'guide.block.title', route: 'blockGuide', iconSource: BlockIcon },
  { id: 3.1, titleKey: 'guide.roofing.title', route: 'roofingGuide', iconSource: require('../../assets/images/individual_estiamte/roof.png') },
  { id: 3.4, titleKey: 'guide.rcslab.title', route: 'rcslabGuide', iconSource: ConcreteIcon },
  { id: 3.5, titleKey: 'guide.hollowslab.title', route: 'hollowblockslabGuide', iconSource: require('../../assets/images/individual_estiamte/hollow_slab.png') },
  { id: 3.3, titleKey: 'guide.rods.title', route: 'rodsGuide', iconSource: RodIcon },
  { id: 2, titleKey: 'guide.concrete.title', route: 'concreteGuide', iconSource: ConcreteIcon },
  { id: 3.2, titleKey: 'guide.formwork.title', route: 'formworkGuide', iconSource: ConcreteIcon },
  { id: 3, titleKey: 'guide.plaster.title', route: 'plasterGuide', iconSource: require('../../assets/images/individual_estiamte/plaster_c.jpg') },
  { id: 4, titleKey: 'guide.tiles.title', route: 'tilesGuide', iconSource: TilesIcon },
  { id: 5, titleKey: 'guide.paint.title', route: 'paintGuide', iconSource: PaintIcon },
  { id: 6, titleKey: 'guide.foundation.title', route: 'foundationGuide', iconSource: BlockIcon },
  { id: 7, titleKey: 'guide.excavation.title', route: 'excavationGuide', iconSource: ExcavationIcon },
  { id: 8, titleKey: 'guide.filling.title', route: 'fillingGuide', iconSource: FillingIcon },
];

export default guides;
