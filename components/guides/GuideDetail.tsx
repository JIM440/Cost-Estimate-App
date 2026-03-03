import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import createGuideStyles from '../../styles/screens/Guides';
import { useTheme } from '../../context/ThemeContext';
import { useLocale, type Language } from '../../context/LocaleContext';

export type GuideSection =
  | { type: 'step'; text: Record<Language, string> }
  | { type: 'text'; text: Record<Language, string> }
  | { type: 'equation'; text: Record<Language, string> }
  | { type: 'note'; text: Record<Language, string> }
  | { type: 'bullets'; items: Record<Language, string[]> };

export type GuideContent = {
  heading: Record<Language, string>;
  sections: GuideSection[];
};

type Props = {
  content: GuideContent;
};

export default function GuideDetail({ content }: Props) {
  const { colors } = useTheme();
  const { language } = useLocale();
  const styles = createGuideStyles(colors);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{content.heading[language]}</Text>
      {content.sections.map((section, idx) => {
        if (section.type === 'bullets') {
          return (
            <View key={idx} style={styles.bulletContainer}>
              {section.items[language].map((item, i) => (
                <Text key={i} style={styles.bullet}>
                  - {item}
                </Text>
              ))}
            </View>
          );
        }

        const text = section.text[language];
        if (section.type === 'step') return <Text key={idx} style={styles.step}>{text}</Text>;
        if (section.type === 'equation') return <Text key={idx} style={styles.equation}>{text}</Text>;
        if (section.type === 'note') return <Text key={idx} style={styles.note}>{text}</Text>;
        return <Text key={idx} style={styles.text}>{text}</Text>;
      })}
    </ScrollView>
  );
}

