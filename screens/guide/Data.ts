import React from 'react';
import BlockIcon from '../../assets/images/individual_estimate/block.svg';
import RodIcon from '../../assets/images/individual_estimate/rod.svg';
import ExcavationIcon from '../../assets/images/individual_estimate/excavation.svg';
import FillingIcon from '../../assets/images/individual_estimate/filling.svg';
import TilesIcon from '../../assets/images/individual_estimate/tiles.svg';
import PaintIcon from '../../assets/images/individual_estimate/paint.svg';
const RCSlabIcon = require('../../assets/images/individual_estimate/rc_slab.png');
const ColumnConcreteIcon = require('../../assets/images/individual_estimate/column_concrete.png');
const FormworkIcon = require('../../assets/images/individual_estimate/formwork.png');
// On web, SVG imports often resolve to the same component; use PNGs so each guide shows the correct icon
const isWeb = typeof window !== 'undefined';
const RodIconWeb = require('../../assets/images/individual_estimate/rod.png');
const TilesIconWeb = require('../../assets/images/individual_estimate/tiles.png');
const PaintIconWeb = require('../../assets/images/individual_estimate/paint.png');
const ExcavationIconWeb = require('../../assets/images/individual_estimate/excavation.png');
const FillingIconWeb = require('../../assets/images/individual_estimate/filling.png');

export interface GuideConfig {
  id: number;
  titleKey: string;
  route: string;
  iconSource: number | React.ComponentType<any>;
}

const guides: GuideConfig[] = [
  { id: 1, titleKey: 'guide.block.title', route: 'blockGuide', iconSource: BlockIcon },
  { id: 3.1, titleKey: 'guide.roofing.title', route: 'roofingGuide', iconSource: require('../../assets/images/individual_estimate/roof.png') },
  { id: 3.4, titleKey: 'guide.rcslab.title', route: 'rcslabGuide', iconSource: RCSlabIcon },
  { id: 3.5, titleKey: 'guide.hollowslab.title', route: 'hollowblockslabGuide', iconSource: require('../../assets/images/individual_estimate/hollow_slab.png') },
  { id: 3.3, titleKey: 'guide.rods.title', route: 'rodsGuide', iconSource: isWeb ? RodIconWeb : RodIcon },
  { id: 2, titleKey: 'guide.concrete.title', route: 'concreteGuide', iconSource: ColumnConcreteIcon },
  { id: 3.2, titleKey: 'guide.formwork.title', route: 'formworkGuide', iconSource: FormworkIcon },
  { id: 3, titleKey: 'guide.plaster.title', route: 'plasterGuide', iconSource: require('../../assets/images/individual_estimate/plaster_c.jpg') },
  { id: 4, titleKey: 'guide.tiles.title', route: 'tilesGuide', iconSource: isWeb ? TilesIconWeb : TilesIcon },
  { id: 5, titleKey: 'guide.paint.title', route: 'paintGuide', iconSource: isWeb ? PaintIconWeb : PaintIcon },
  { id: 7, titleKey: 'guide.excavation.title', route: 'excavationGuide', iconSource: isWeb ? ExcavationIconWeb : ExcavationIcon },
  { id: 8, titleKey: 'guide.filling.title', route: 'fillingGuide', iconSource: isWeb ? FillingIconWeb : FillingIcon },
];

export default guides;
