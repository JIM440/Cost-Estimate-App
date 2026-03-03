import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import ToolCard from '../cards/ToolCard';
import { containerStyles } from '../../styles/utility';
import { wideCardStyles } from '../../styles/components/cards';
import { useLocale } from '../../context/LocaleContext';
import { useTheme } from '../../context/ThemeContext';
import BlockIcon from '../../assets/images/individual_estiamte/block.svg';
import RcSlabIcon from '../../assets/images/individual_estiamte/concrete.svg';
import RodsIcon from '../../assets/images/individual_estiamte/rod.svg';
import ConcreteIcon from '../../assets/images/individual_estiamte/concrete.svg';
import FormworkIcon from '../../assets/images/individual_estiamte/concrete.svg';
import TilesIcon from '../../assets/images/individual_estiamte/tiles.svg';
import PaintIcon from '../../assets/images/individual_estiamte/paint.svg';
import FoundationIcon from '../../assets/images/individual_estiamte/block.svg';
import ExcavationIcon from '../../assets/images/individual_estiamte/excavation.svg';
import FillingIcon from '../../assets/images/individual_estiamte/filling.svg';
const RoofingIcon = require('../../assets/images/individual_estiamte/roof.png');
const HollowSlabIcon = require('../../assets/images/individual_estiamte/hollow_slab.png');
const PlasterIcon = require('../../assets/images/individual_estiamte/plaster_c.jpg');

const estimates = [
  { titleKey: 'items.block', route: '/block', icon: BlockIcon },
  { titleKey: 'items.roofing', route: '/roofing', icon: RoofingIcon },
  { titleKey: 'items.rcslab', route: '/rcslab', icon: RcSlabIcon },
  { titleKey: 'items.hollowslab', route: '/hollowslab', icon: HollowSlabIcon },
  { titleKey: 'items.rods', route: '/rods', icon: RodsIcon },
  { titleKey: 'items.columnConcrete', route: '/concrete', icon: ConcreteIcon },
  { titleKey: 'items.formwork', route: '/formwork', icon: FormworkIcon },
  { titleKey: 'items.plaster', route: '/plaster', icon: PlasterIcon },
  { titleKey: 'items.tiles', route: '/tiles', icon: TilesIcon },
  { titleKey: 'items.paint', route: '/paint', icon: PaintIcon },
  { titleKey: 'items.foundationDepth', route: '/foundation', icon: FoundationIcon },
  { titleKey: 'items.excavation', route: '/excavation', icon: ExcavationIcon },
  { titleKey: 'items.filling', route: '/filling', icon: FillingIcon },
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

