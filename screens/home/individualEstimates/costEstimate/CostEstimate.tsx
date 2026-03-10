import { ScrollView, View } from 'react-native';
import React from 'react';
import { containerStyles } from '../../../../styles/utility';
import { wideCardStyles } from '../../../../styles/components/cards';
import { useRouter } from 'expo-router';
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '../../../../context/ThemeContext';
import ToolCard from '../../../../components/cards/ToolCard';
import BlockIcon from '../../../../assets/images/individual_estimate/block.svg';
import ConcreteIcon from '../../../../assets/images/individual_estimate/concrete.svg';
import RodIcon from '../../../../assets/images/individual_estimate/rod.svg';
import TilesIcon from '../../../../assets/images/individual_estimate/tiles.svg';
import PaintIcon from '../../../../assets/images/individual_estimate/paint.svg';
import ExcavationIcon from '../../../../assets/images/individual_estimate/excavation.svg';
import FillingIcon from '../../../../assets/images/individual_estimate/filling.svg';

const RoofingIcon = require('../../../../assets/images/individual_estimate/roof.png');
const HollowSlabIcon = require('../../../../assets/images/individual_estimate/hollow_slab.png');
const PlasterIcon = require('../../../../assets/images/individual_estimate/plaster_c.jpg');

const estimates = [
  { nameKey: 'items.block', route: 'Block', icon: BlockIcon },
  { nameKey: 'items.roofing', route: 'Roofing', icon: RoofingIcon },
  { nameKey: 'items.rcslab', route: 'RCSlab', icon: ConcreteIcon },
  { nameKey: 'items.hollowslab', route: 'HollowSlab', icon: HollowSlabIcon },
  { nameKey: 'items.rods', route: 'Rods', icon: RodIcon },
  { nameKey: 'items.columnConcrete', route: 'Concrete', icon: ConcreteIcon },
  { nameKey: 'items.formwork', route: 'Formwork', icon: ConcreteIcon },
  { nameKey: 'items.plaster', route: 'Plaster', icon: PlasterIcon },
  { nameKey: 'items.tiles', route: 'Tiles', icon: TilesIcon },
  { nameKey: 'items.paint', route: 'Paint', icon: PaintIcon },
  { nameKey: 'items.bricks', route: 'Bricks', icon: BlockIcon },
  { nameKey: 'items.excavation', route: 'Excavation', icon: ExcavationIcon },
  { nameKey: 'items.filling', route: 'Filling', icon: FillingIcon },
];

const routeMap: Record<string, string> = {
  Block: '/block', Roofing: '/roofing', RCSlab: '/rcslab', HollowSlab: '/hollowslab',
  Rods: '/rods', Concrete: '/concrete', Formwork: '/formwork', Plaster: '/plaster',
  Tiles: '/tiles', Paint: '/paint', Bricks: '/bricks', Excavation: '/excavation', Filling: '/filling',
};
const CostEstimate: React.FC = () => {
  const router = useRouter();
  const { t } = useLocale();
  const { colors } = useTheme();
  return (
    <ScrollView style={[containerStyles.container, { backgroundColor: colors.screen_background }]}>
      <View style={wideCardStyles.wideCardContainer}>
        {estimates.map((estimate, index) => (
          <ToolCard
            key={index + 1}
            title={t(estimate.nameKey)}
            icon={estimate.icon}
            onPress={() => router.push(routeMap[estimate.route] ?? '/')}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CostEstimate;
