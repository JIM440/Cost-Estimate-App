import type { GuideContent } from '../../components/guides/GuideDetail';

export type GuideId =
  | 'block'
  | 'roofing'
  | 'rcslab'
  | 'hollowslab'
  | 'rods'
  | 'concrete'
  | 'formwork'
  | 'plaster'
  | 'tiles'
  | 'paint'
  | 'foundation'
  | 'excavation'
  | 'filling';

const content: Record<GuideId, GuideContent> = {
  block: {
    heading: {
      'en-GB': 'Step-by-step guide: Estimating block masonry cost',
      fr: 'Guide étape par étape : estimer le coût de la maçonnerie en blocs',
    },
    sections: [
      {
        type: 'step',
        text: {
          'en-GB': '1. Gather required inputs',
          fr: '1. Rassembler les données nécessaires',
        },
      },
      {
        type: 'text',
        text: {
          'en-GB': 'To estimate the cost of block masonry, gather the following inputs:',
          fr: 'Pour estimer le coût de la maçonnerie en blocs, rassemblez les éléments suivants :',
        },
      },
      {
        type: 'bullets',
        items: {
          'en-GB': [
            'Length of wall (m)',
            'Width of wall (m)',
            'Height of wall (m)',
            'Block length (m)',
            'Block width (m)',
            'Block height (m)',
            'Area to subtract (if any, m²)',
            'Mix ratio (cement : sand)',
            'Price per block (currency)',
          ],
          fr: [
            'Longueur du mur (m)',
            'Épaisseur du mur (m)',
            'Hauteur du mur (m)',
            'Longueur du bloc (m)',
            'Largeur du bloc (m)',
            'Hauteur du bloc (m)',
            'Surface à soustraire (ouvrants, m²)',
            'Dosage du mortier (ciment : sable)',
            'Prix unitaire du bloc (monnaie)',
          ],
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '2. Validate inputs', fr: '2. Valider les données' },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'Ensure all required inputs are provided and valid before proceeding with the calculations.',
          fr: 'Assurez-vous que toutes les données requises sont renseignées et cohérentes avant de lancer les calculs.',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '3. Calculate wall volume', fr: '3. Calculer le volume du mur' },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'Calculate the volume of the wall to be built, considering any subtracted areas:',
          fr: 'Calculez le volume du mur à construire en tenant compte des surfaces à soustraire :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Wall volume (m³) = (Length × Width − Area to subtract) × Height',
          fr: 'Volume du mur (m³) = (Longueur × Épaisseur − Surface à soustraire) × Hauteur',
        },
      },
      {
        type: 'step',
        text: {
          'en-GB': '4. Calculate number of blocks',
          fr: '4. Calculer le nombre de blocs',
        },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'Determine the total number of blocks needed based on wall volume and block dimensions:',
          fr: 'Déterminez le nombre total de blocs nécessaires à partir du volume du mur et du volume d’un bloc :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Number of blocks = Ceil(Wall volume / Block volume)',
          fr: 'Nombre de blocs = Arrondi supérieur (Volume du mur / Volume d’un bloc)',
        },
      },
      {
        type: 'step',
        text: {
          'en-GB': '5. Calculate dry mortar volume',
          fr: '5. Calculer le volume de mortier sec',
        },
      },
      {
        type: 'text',
        text: {
          'en-GB': 'Calculate the volume of dry mortar required for laying the blocks:',
          fr: 'Calculez le volume de mortier sec nécessaire pour le montage des blocs :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Dry mortar volume (m³) = Wall volume × 1.54',
          fr: 'Volume de mortier sec (m³) = Volume du mur × 1,54',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '6. Calculate sand volume', fr: '6. Calculer le volume de sable' },
      },
      {
        type: 'text',
        text: {
          'en-GB': 'Calculate the volume of sand required for the mortar mix:',
          fr: 'Calculez le volume de sable requis pour le mortier :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Sand volume (m³) = (Dry mortar volume × sand ratio) / sum of ratio',
          fr: 'Volume de sable (m³) = (Mortier sec × part de sable) / somme des parts',
        },
      },
      {
        type: 'step',
        text: {
          'en-GB': '7. Calculate cement volume and weight',
          fr: '7. Calculer le volume et le poids du ciment',
        },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'Calculate the volume and weight of cement required for the mortar mix (assuming density of 1440 kg/m³):',
          fr: 'Calculez le volume et le poids du ciment nécessaires (masse volumique ~1440 kg/m³) :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Cement volume (m³) = (Dry mortar volume × cement ratio) / sum of ratio',
          fr: 'Volume de ciment (m³) = (Mortier sec × part de ciment) / somme des parts',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Cement weight (kg) = Cement volume × 1440',
          fr: 'Poids du ciment (kg) = Volume de ciment × 1440',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Bags of cement = Cement weight / 50',
          fr: 'Nombre de sacs = Poids du ciment / 50',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '8. Calculate total cost', fr: '8. Calculer le coût total' },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'Determine the total cost of blocks based on the number of blocks and the price per block:',
          fr: 'Calculez le coût total des blocs en fonction du nombre de blocs et du prix unitaire :',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Total block cost = Number of blocks × Price per block',
          fr: 'Coût total des blocs = Nombre de blocs × Prix unitaire du bloc',
        },
      },
    ],
  },

  roofing: {
    heading: {
      'en-GB': 'Step-by-step guide: Estimating roofing materials',
      fr: 'Guide étape par étape : estimer les matériaux de toiture',
    },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'text', text: { 'en-GB': 'To estimate roofing materials, gather the following inputs:', fr: 'Pour estimer les matériaux de toiture, rassemblez les éléments suivants :' } },
      { type: 'bullets', items: { 'en-GB': ['House length (m)', 'House width (m)', 'Rise (m)', 'Run (m)', 'Span (m)'], fr: ['Longueur de la maison (m)', 'Largeur de la maison (m)', 'Relevé (rise) (m)', 'Projection (run) (m)', 'Portée (span) (m)'] } },
      { type: 'step', text: { 'en-GB': '2. Validate inputs', fr: '2. Valider les données' } },
      { type: 'text', text: { 'en-GB': 'Ensure all required inputs are provided and valid before calculating.', fr: 'Assurez-vous que toutes les données sont renseignées et cohérentes avant de calculer.' } },
      { type: 'step', text: { 'en-GB': '3. Calculate rafter length', fr: '3. Calculer la longueur d’un chevron' } },
      { type: 'text', text: { 'en-GB': 'Use the Pythagorean theorem:', fr: 'Utilisez le théorème de Pythagore :' } },
      { type: 'equation', text: { 'en-GB': 'Rafter length = √(Rise² + Run²)', fr: 'Longueur chevron = √(Rise² + Run²)' } },
      { type: 'step', text: { 'en-GB': '4. Calculate roof pitch', fr: '4. Calculer la pente de toiture' } },
      { type: 'equation', text: { 'en-GB': 'Pitch ratio = Rise / Run', fr: 'Rapport de pente = Rise / Run' } },
      { type: 'equation', text: { 'en-GB': 'Pitch (degrees) = arctan(Pitch ratio) × (180 / π)', fr: 'Pente (degrés) = arctan(Rapport) × (180 / π)' } },
      { type: 'step', text: { 'en-GB': '5. Calculate number of rafters', fr: '5. Calculer le nombre de chevrons' } },
      { type: 'equation', text: { 'en-GB': 'Number of rafters = Ceil(Length / Span) + 1', fr: 'Nombre de chevrons = Arrondi sup.(Longueur / Portée) + 1' } },
      { type: 'step', text: { 'en-GB': '6. Calculate roofing sheets', fr: '6. Calculer le nombre de tôles' } },
      { type: 'equation', text: { 'en-GB': 'Roof area (m²) = (Length × Width) / cos(Pitch)', fr: 'Surface toiture (m²) = (Longueur × Largeur) / cos(Pente)' } },
      { type: 'equation', text: { 'en-GB': 'Sheets = Ceil(Roof area / 30)', fr: 'Tôles = Arrondi sup.(Surface toiture / 30)' } },
      { type: 'step', text: { 'en-GB': '7. Calculate ceiling boards', fr: '7. Calculer les panneaux de plafond' } },
      { type: 'equation', text: { 'en-GB': 'Ceiling boards = Ceil(House area / 32)', fr: 'Plafond = Arrondi sup.(Surface maison / 32)' } },
      { type: 'step', text: { 'en-GB': '8. Calculate purlins', fr: '8. Calculer les pannes' } },
      { type: 'equation', text: { 'en-GB': 'Purlins = Ceil((Rafter length × Length) / 0.9)', fr: 'Pannes = Arrondi sup.((Longueur chevron × Longueur) / 0,9)' } },
      { type: 'step', text: { 'en-GB': '9. Total boards', fr: '9. Total des planches' } },
      { type: 'equation', text: { 'en-GB': 'Total boards = Ceil(Rafters + Risers + Chaining)', fr: 'Total planches = Arrondi sup.(Chevrons + Montants + Chaînage)' } },
    ],
  },

  rcslab: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating RC slab', fr: 'Guide étape par étape : estimer une dalle en béton armé' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'text', text: { 'en-GB': 'You will need the following inputs:', fr: 'Vous aurez besoin des données suivantes :' } },
      { type: 'bullets', items: { 'en-GB': ['Slab length (m)', 'Slab width (m)', 'Slab thickness (m)', 'Rod spacing (m)', 'Mix ratio (cement : sand : gravel)', 'Dry volume constant'], fr: ['Longueur de la dalle (m)', 'Largeur de la dalle (m)', 'Épaisseur de la dalle (m)', 'Espacement des barres (m)', 'Dosage (ciment : sable : gravier)', 'Constante de volume sec'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate slab area', fr: '2. Calculer la surface de la dalle' } },
      { type: 'equation', text: { 'en-GB': 'Area (m²) = Length × Width', fr: 'Surface (m²) = Longueur × Largeur' } },
      { type: 'step', text: { 'en-GB': '3. Calculate concrete volume', fr: '3. Calculer le volume de béton' } },
      { type: 'equation', text: { 'en-GB': 'Concrete volume (m³) = Area × Thickness', fr: 'Volume béton (m³) = Surface × Épaisseur' } },
      { type: 'step', text: { 'en-GB': '4. Calculate reinforcement rods', fr: '4. Calculer les barres d’armature' } },
      { type: 'equation', text: { 'en-GB': '12m rods ≈ (Rods in X × Width / 12) + (Rods in Y × Length / 12)', fr: 'Barres de 12 m ≈ (Barres en X × Largeur / 12) + (Barres en Y × Longueur / 12)' } },
      { type: 'step', text: { 'en-GB': '5. Dry volume', fr: '5. Volume sec' } },
      { type: 'equation', text: { 'en-GB': 'Dry volume = Concrete volume × Dry constant', fr: 'Volume sec = Volume béton × Constante' } },
      { type: 'step', text: { 'en-GB': '6. Cement, sand, gravel volumes', fr: '6. Volumes ciment, sable, gravier' } },
      { type: 'text', text: { 'en-GB': 'Split dry volume by the mix ratio.', fr: 'Répartissez le volume sec selon le dosage.' } },
      { type: 'step', text: { 'en-GB': '7. Cement bags', fr: '7. Sacs de ciment' } },
      { type: 'equation', text: { 'en-GB': 'Bags = Ceiling((Cement volume × 1440) / 50)', fr: 'Sacs = Arrondi sup.((Volume ciment × 1440) / 50)' } },
      { type: 'note', text: { 'en-GB': 'Assuming 1 bag = 50 kg and cement density ≈ 1440 kg/m³.', fr: 'Hypothèse : 1 sac = 50 kg et densité ciment ≈ 1440 kg/m³.' } },
    ],
  },

  // The remaining guides follow the same pattern (short + structured).
  hollowslab: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating hollow block slab', fr: 'Guide étape par étape : estimer une dalle à entrevous' },
    sections: [
      { type: 'text', text: { 'en-GB': 'This guide explains the inputs and calculation flow for hollow block slabs.', fr: 'Ce guide explique les entrées et le flux de calcul pour les dalles à entrevous.' } },
    ],
  },
  rods: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating rod cost', fr: 'Guide étape par étape : estimer le coût des fers à béton' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Length per rod (m)', 'Diameter (mm)', 'Price per kg', 'Number of rods'], fr: ['Longueur par barre (m)', 'Diamètre (mm)', 'Prix au kg', 'Nombre de barres'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate weight', fr: '2. Calculer le poids' } },
      { type: 'equation', text: { 'en-GB': 'Rod weight (kg) ≈ (Diameter² × Length) / 162', fr: 'Poids barre (kg) ≈ (Diamètre² × Longueur) / 162' } },
      { type: 'equation', text: { 'en-GB': 'Total cost = Total weight × Price per kg', fr: 'Coût total = Poids total × Prix au kg' } },
    ],
  },
  concrete: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating concrete cost', fr: 'Guide étape par étape : estimer le coût du béton' },
    sections: [
      { type: 'bullets', items: { 'en-GB': ['Length (m)', 'Width (m)', 'Height (m)', 'Mix ratio', 'Price per m³'], fr: ['Longueur (m)', 'Largeur (m)', 'Hauteur (m)', 'Dosage', 'Prix au m³'] } },
      { type: 'equation', text: { 'en-GB': 'Volume (m³) = Length × Width × Height', fr: 'Volume (m³) = Longueur × Largeur × Hauteur' } },
    ],
  },
  formwork: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating formwork', fr: 'Guide étape par étape : estimer le coffrage' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to structure formwork input and totals.', fr: 'Utilisez ce guide pour structurer les entrées de coffrage et les totaux.' } }],
  },
  plaster: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating plaster', fr: 'Guide étape par étape : estimer l’enduit / plâtre' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate plaster quantities and cost.', fr: 'Utilisez ce guide pour estimer les quantités et le coût d’enduit.' } }],
  },
  tiles: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating tiles', fr: 'Guide étape par étape : estimer le carrelage' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate tile area and totals.', fr: 'Utilisez ce guide pour estimer la surface de carrelage et les totaux.' } }],
  },
  paint: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating paint', fr: 'Guide étape par étape : estimer la peinture' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate paint surface, coats and totals.', fr: 'Utilisez ce guide pour estimer la surface à peindre, les couches et les totaux.' } }],
  },
  foundation: {
    heading: { 'en-GB': 'Step-by-step guide: Choosing foundation depth', fr: 'Guide étape par étape : choisir la profondeur des fondations' },
    sections: [{ type: 'text', text: { 'en-GB': 'This guide provides a simple framework for foundation depth selection.', fr: 'Ce guide propose un cadre simple pour choisir la profondeur des fondations.' } }],
  },
  excavation: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating excavation', fr: 'Guide étape par étape : estimer l’excavation' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate excavation volume and cost.', fr: 'Utilisez ce guide pour estimer le volume et le coût d’excavation.' } }],
  },
  filling: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating filling', fr: 'Guide étape par étape : estimer le remblai' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate filling volume and cost.', fr: 'Utilisez ce guide pour estimer le volume et le coût de remblai.' } }],
  },
};

export function getGuideContent(id: GuideId): GuideContent {
  return content[id];
}

