import React from 'react';
import { View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import ToolCard from '../cards/ToolCard';
import { containerStyles } from '../../styles/utility';
import { wideCardStyles } from '../../styles/components/cards';
import { useLocale } from '../../context/LocaleContext';
import { useTheme } from '../../context/ThemeContext';
import BlockIcon from '../../assets/images/individual_estimate/block.svg';
import RodsIcon from '../../assets/images/individual_estimate/rod.svg';
import TilesIcon from '../../assets/images/individual_estimate/tiles.svg';
import PaintIcon from '../../assets/images/individual_estimate/paint.svg';
import ExcavationIcon from '../../assets/images/individual_estimate/excavation.svg';
import FillingIcon from '../../assets/images/individual_estimate/filling.svg';
const RoofingIcon = require('../../assets/images/individual_estimate/roof.png');
const HollowSlabIcon = require('../../assets/images/individual_estimate/hollow_slab.png');
const FormworkIcon = require('../../assets/images/individual_estimate/formwork.png');
const ColumnConcreteIcon = require('../../assets/images/individual_estimate/column_concrete.png');
const RcSlabIcon = require('../../assets/images/individual_estimate/rc_slab.png');
const PlasterIcon = require('../../assets/images/individual_estimate/plaster_c.jpg');
// On web, SVG imports often resolve to the same component; use PNGs so each item shows the correct icon
const RodsIconWeb = require('../../assets/images/individual_estimate/rod.png');
const TilesIconWeb = require('../../assets/images/individual_estimate/tiles.png');
const PaintIconWeb = require('../../assets/images/individual_estimate/paint.png');
const ExcavationIconWeb = require('../../assets/images/individual_estimate/excavation.png');
const FillingIconWeb = require('../../assets/images/individual_estimate/filling.png');

const estimates = [
  { titleKey: 'items.block', route: '/block', icon: BlockIcon },
  { titleKey: 'items.roofing', route: '/roofing', icon: RoofingIcon },
  { titleKey: 'items.rcslab', route: '/rcslab', icon: RcSlabIcon },
  { titleKey: 'items.hollowslab', route: '/hollowslab', icon: HollowSlabIcon },
  { titleKey: 'items.rods', route: '/rods', icon: Platform.OS === 'web' ? RodsIconWeb : RodsIcon },
  { titleKey: 'items.columnConcrete', route: '/concrete', icon: ColumnConcreteIcon },
  { titleKey: 'items.formwork', route: '/formwork', icon: FormworkIcon },
  { titleKey: 'items.plaster', route: '/plaster', icon: PlasterIcon },
  { titleKey: 'items.tiles', route: '/tiles', icon: Platform.OS === 'web' ? TilesIconWeb : TilesIcon },
  { titleKey: 'items.paint', route: '/paint', icon: Platform.OS === 'web' ? PaintIconWeb : PaintIcon },
  { titleKey: 'items.bricks', route: '/bricks', icon: BlockIcon },
  { titleKey: 'items.excavation', route: '/excavation', icon: Platform.OS === 'web' ? ExcavationIconWeb : ExcavationIcon },
  { titleKey: 'items.filling', route: '/filling', icon: Platform.OS === 'web' ? FillingIconWeb : FillingIcon },
];

export default function IndividualEstimatesSection() {
  const router = useRouter();
  const { t } = useLocale();
  const { colors } = useTheme();

  return (
    <View style={[containerStyles.container, wideCardStyles.wideCardContainer, { backgroundColor: colors.screen_background, paddingTop: 16 }]}>
      {estimates.map((estimate, index) => (
        <ToolCard
          key={index}
          title={String(t(estimate.titleKey) || '')}
          icon={estimate.icon}
          onPress={() => router.push(estimate.route)}
          containerStyle={{ paddingVertical: 16 }}
        />
      ))}
    </View>
  );
}

