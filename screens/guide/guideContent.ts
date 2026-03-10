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
          'en-GB': 'Dry mortar volume (m³) = Wall volume × 1.33',
          fr: 'Volume de mortier sec (m³) = Volume du mur × 1,33',
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
      {
        type: 'step',
        text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'To estimate roofing materials and cost, gather the following inputs:',
          fr: 'Pour estimer les matériaux et le coût de la toiture, rassemblez les éléments suivants :',
        },
      },
      {
        type: 'bullets',
        items: {
          'en-GB': [
            'House length (m) – overall length of the building',
            'House width (m) – overall width of the building',
            'Rise (m)',
            'Run (m)',
            'Span (m)',
            'Roof overhang (optional, m)',
            'Roof type (gable by default)',
          ],
          fr: [
            'Longueur de la maison (m)',
            'Largeur de la maison (m)',
            'Relevé (rise) (m)',
            'Projection (run) (m)',
            'Portée (span) (m)',
            'Débord de toiture (optionnel, m)',
            'Type de toiture (deux versants par défaut)',
          ],
        },
      },
      {
        type: 'text',
        text: {
          'en-GB':
            'In all formulas below, “length” and “width” refer to the house length and house width of the building footprint.',
          fr: 'Dans toutes les formules ci‑dessous, « longueur » et « largeur » désignent la longueur et la largeur de la maison (emprise au sol du bâtiment).',
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
            'Ensure all required inputs are positive values before calculating. Dimensions must be greater than zero.',
          fr: 'Vérifiez que toutes les dimensions sont strictement positives avant de lancer les calculs.',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '3. Calculate rafter length', fr: '3. Calculer la longueur d’un chevron' },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Rafter length = √(Rise² + Run²)',
          fr: 'Longueur chevron = √(Rise² + Run²)',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '4. Calculate roof pitch', fr: '4. Calculer la pente de toiture' },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Pitch ratio = Rise / Run',
          fr: 'Rapport de pente = Rise / Run',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Pitch (degrees) = arctan(Pitch ratio) × (180 / π)',
          fr: 'Pente (degrés) = arctan(Rapport) × (180 / π)',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '5. Calculate roof and ceiling areas', fr: '5. Calculer les surfaces toiture et plafond' },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Roof area (gable) = 2 × House length × Rafter length',
          fr: 'Surface toiture (deux versants) = 2 × Longueur × Longueur chevron',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Ceiling area = House length × House width',
          fr: 'Surface plafond = Longueur × Largeur',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '6. Estimate number of sheets', fr: '6. Estimer le nombre de tôles' },
      },
      {
        type: 'equation',
        text: {
          'en-GB':
            'Effective sheet width = Sheet width − Overlap\nSheets = Ceil(Roof area / (Sheet length × Effective sheet width)) × 1,05',
          fr: 'Largeur utile tôle = Largeur tôle − Recouvrement\nTôles = Arrondi sup.(Surface toiture / (Longueur tôle × Largeur utile)) × 1,05',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '7. Estimate ceiling boards', fr: '7. Estimer les panneaux de plafond' },
      },
      {
        type: 'equation',
        text: {
          'en-GB':
            'Boards = Ceil(Ceiling area / (Board length × Board width)) × 1,05',
          fr: 'Panneaux = Arrondi sup.(Surface plafond / (Longueur panneau × Largeur panneau)) × 1,05',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '8. Estimate rafters and purlins', fr: '8. Estimer chevrons et pannes' },
      },
      {
        type: 'equation',
        text: {
          'en-GB': 'Number of rafters = Ceil(House length / Rafter spacing) + 1',
          fr: 'Nombre de chevrons = Arrondi sup.(Longueur maison / Entraxe chevrons) + 1',
        },
      },
      {
        type: 'equation',
        text: {
          'en-GB':
            'Purlin rows = Ceil(Rafter length / Purlin spacing)\nTotal purlin length = Purlin rows × House length × 2\nNumber of purlins = Ceil(Total length / Standard purlin length)',
          fr: 'Rangées de pannes = Arrondi sup.(Longueur chevron / Entraxe pannes)\nLongueur totale de pannes = Rangées × Longueur maison × 2\nNombre de pannes = Arrondi sup.(Longueur totale / Longueur standard)',
        },
      },
      {
        type: 'step',
        text: { 'en-GB': '9. Single vs multi-storey notes', fr: '9. Toiture RDC vs étages' },
      },
      {
        type: 'bullets',
        items: {
          'en-GB': [
            'Single-storey roofs usually use timber rafters on a wall plate.',
            'Multi-storey roofs may require reinforced ring beams and steel trusses.',
            'Higher buildings need extra wind bracing and anchorage.',
          ],
          fr: [
            'Les toitures de plain-pied utilisent souvent des chevrons bois sur une lisse haute.',
            'Les toitures sur plusieurs niveaux peuvent nécessiter une ceinture béton armé et des fermes métalliques.',
            'Les bâtiments plus hauts demandent davantage de contreventement et d’ancrages.',
          ],
        },
      },
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
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Length (m)', 'Width (m)', 'Height (m)', 'Mix ratio (cement : sand : gravel)', 'Dry volume constant', 'Price per m³'], fr: ['Longueur (m)', 'Largeur (m)', 'Hauteur (m)', 'Dosage (ciment : sable : gravier)', 'Constante de volume sec', 'Prix au m³'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate wet concrete volume', fr: '2. Calculer le volume de béton frais' } },
      { type: 'equation', text: { 'en-GB': 'Volume (m³) = Length × Width × Height', fr: 'Volume (m³) = Longueur × Largeur × Hauteur' } },
      { type: 'step', text: { 'en-GB': '3. Convert to dry volume', fr: '3. Convertir en volume sec' } },
      { type: 'equation', text: { 'en-GB': 'Dry volume = Wet volume × Dry constant (≈ 1.54)', fr: 'Volume sec = Volume frais × Constante (≈ 1,54)' } },
      { type: 'step', text: { 'en-GB': '4. Split into cement, sand and gravel', fr: '4. Répartir en ciment, sable et gravier' } },
      { type: 'equation', text: { 'en-GB': 'Cement volume = Dry volume × Cement ratio / Sum of ratios', fr: 'Volume ciment = Volume sec × Part ciment / Somme des parts' } },
      { type: 'equation', text: { 'en-GB': 'Sand volume = Dry volume × Sand ratio / Sum of ratios', fr: 'Volume sable = Volume sec × Part sable / Somme des parts' } },
      { type: 'equation', text: { 'en-GB': 'Gravel volume = Dry volume × Gravel ratio / Sum of ratios', fr: 'Volume gravier = Volume sec × Part gravier / Somme des parts' } },
      { type: 'step', text: { 'en-GB': '5. Estimate cement bags and cost', fr: '5. Estimer les sacs de ciment et le coût' } },
      { type: 'equation', text: { 'en-GB': 'Cement weight (kg) = Cement volume × 1440', fr: 'Poids ciment (kg) = Volume ciment × 1440' } },
      { type: 'equation', text: { 'en-GB': 'Bags of cement = Cement weight / 50', fr: 'Sacs de ciment = Poids ciment / 50' } },
      { type: 'equation', text: { 'en-GB': 'Concrete cost = Dry volume × Price per m³', fr: 'Coût béton = Volume sec × Prix au m³' } },
    ],
  },
  formwork: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating formwork', fr: 'Guide étape par étape : estimer le coffrage' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Length of element (m)', 'Width or height (m)', 'Price per m² of formwork'], fr: ['Longueur de l’élément (m)', 'Largeur ou hauteur (m)', 'Prix du coffrage au m²'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate area to be shuttered', fr: '2. Calculer la surface à coffrer' } },
      { type: 'equation', text: { 'en-GB': 'Area (m²) ≈ Exposed perimeter × Height', fr: 'Surface (m²) ≈ Périmètre apparent × Hauteur' } },
      { type: 'step', text: { 'en-GB': '3. Estimate total formwork cost', fr: '3. Estimer le coût total de coffrage' } },
      { type: 'equation', text: { 'en-GB': 'Formwork cost = Area × Price per m²', fr: 'Coût coffrage = Surface × Prix au m²' } },
    ],
  },
  plaster: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating plaster', fr: 'Guide étape par étape : estimer l’enduit / plâtre' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Wall area (m²)', 'Area of openings (m²)', 'Plaster thickness (mm)', 'Wastage (%)', 'Price per m²'], fr: ['Surface de mur (m²)', 'Surface des ouvertures (m²)', 'Épaisseur d’enduit (mm)', 'Pertes (%)', 'Prix au m²'] } },
      { type: 'step', text: { 'en-GB': '2. Net area to plaster', fr: '2. Surface nette à enduire' } },
      { type: 'equation', text: { 'en-GB': 'Net area (m²) = Wall area − Openings', fr: 'Surface nette (m²) = Surface mur − Ouvertures' } },
      { type: 'step', text: { 'en-GB': '3. Adjust for wastage', fr: '3. Ajuster pour les pertes' } },
      { type: 'equation', text: { 'en-GB': 'Effective area = Net area × (1 + Wastage / 100)', fr: 'Surface effective = Surface nette × (1 + Pertes / 100)' } },
      { type: 'step', text: { 'en-GB': '4. Estimate plaster cost', fr: '4. Estimer le coût de l’enduit' } },
      { type: 'equation', text: { 'en-GB': 'Plaster cost = Effective area × Price per m²', fr: 'Coût enduit = Surface effective × Prix au m²' } },
    ],
  },
  tiles: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating tiles', fr: 'Guide étape par étape : estimer le carrelage' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Floor length (m)', 'Floor width (m)', 'Tile length (cm)', 'Tile width (cm)', 'Wastage (%)', 'Price per tile'], fr: ['Longueur du sol (m)', 'Largeur du sol (m)', 'Longueur du carreau (cm)', 'Largeur du carreau (cm)', 'Pertes (%)', 'Prix unitaire du carreau'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate floor and tile areas', fr: '2. Calculer la surface du sol et des carreaux' } },
      { type: 'equation', text: { 'en-GB': 'Floor area (m²) = Length × Width', fr: 'Surface sol (m²) = Longueur × Largeur' } },
      { type: 'equation', text: { 'en-GB': 'Tile area (m²) = (Tile length × Tile width) / 10 000', fr: 'Surface carreau (m²) = (Longueur × Largeur) / 10 000' } },
      { type: 'step', text: { 'en-GB': '3. Number of tiles', fr: '3. Nombre de carreaux' } },
      { type: 'equation', text: { 'en-GB': 'Tiles = Ceil(Floor area / Tile area × (1 + Wastage / 100))', fr: 'Carreaux = Arrondi sup.(Surface sol / Surface carreau × (1 + Pertes / 100))' } },
      { type: 'step', text: { 'en-GB': '4. Total tile cost', fr: '4. Coût total du carrelage' } },
      { type: 'equation', text: { 'en-GB': 'Tile cost = Tiles × Price per tile', fr: 'Coût carrelage = Nombre de carreaux × Prix unitaire' } },
    ],
  },
  paint: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating paint', fr: 'Guide étape par étape : estimer la peinture' },
    sections: [{ type: 'text', text: { 'en-GB': 'Use this guide to estimate paint surface, coats and totals.', fr: 'Utilisez ce guide pour estimer la surface à peindre, les couches et les totaux.' } }],
  },
  excavation: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating excavation', fr: 'Guide étape par étape : estimer l’excavation' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Length (m)', 'Width (m)', 'Depth (m)', 'Price per m³'], fr: ['Longueur (m)', 'Largeur (m)', 'Profondeur (m)', 'Prix au m³'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate excavation volume', fr: '2. Calculer le volume de terrassement' } },
      { type: 'equation', text: { 'en-GB': 'Volume (m³) = Length × Width × Depth', fr: 'Volume (m³) = Longueur × Largeur × Profondeur' } },
      { type: 'step', text: { 'en-GB': '3. Estimate cost', fr: '3. Estimer le coût' } },
      { type: 'equation', text: { 'en-GB': 'Excavation cost = Volume × Price per m³', fr: 'Coût terrassement = Volume × Prix au m³' } },
    ],
  },
  filling: {
    heading: { 'en-GB': 'Step-by-step guide: Estimating filling', fr: 'Guide étape par étape : estimer le remblai' },
    sections: [
      { type: 'step', text: { 'en-GB': '1. Gather required inputs', fr: '1. Rassembler les données nécessaires' } },
      { type: 'bullets', items: { 'en-GB': ['Length (m)', 'Width (m)', 'Depth (m)', 'Compaction factor', 'Truck capacity (m³) per trip', 'Price per trip'], fr: ['Longueur (m)', 'Largeur (m)', 'Profondeur (m)', 'Facteur de compactage', 'Capacité du camion (m³) par voyage', 'Prix par voyage'] } },
      { type: 'step', text: { 'en-GB': '2. Calculate fill volume (incl. compaction)', fr: '2. Calculer le volume de remblai (avec compactage)' } },
      { type: 'equation', text: { 'en-GB': 'Fill volume (m³) = Length × Width × Depth × Compaction factor', fr: 'Volume remblai (m³) = Longueur × Largeur × Profondeur × Facteur de compactage' } },
      { type: 'step', text: { 'en-GB': '3. Number of trips', fr: '3. Nombre de voyages' } },
      { type: 'equation', text: { 'en-GB': 'Trips = Ceil(Fill volume / Truck capacity)', fr: 'Voyages = Arrondi sup.(Volume remblai / Capacité camion)' } },
      { type: 'step', text: { 'en-GB': '4. Total filling cost', fr: '4. Coût total du remblai' } },
      { type: 'equation', text: { 'en-GB': 'Filling cost = Trips × Price per trip', fr: 'Coût remblai = Voyages × Prix par voyage' } },
    ],
  },
};

export function getGuideContent(id: GuideId): GuideContent {
  return content[id];
}

