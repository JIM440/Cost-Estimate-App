import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import ScreenWrapper from '../../components/ScreenWrapper';
import TabHeader from '../../components/TabHeader';
import ProjectCard from '../../components/cards/ProjectCard';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useProjects } from '../../context/ProjectsContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

export default function ProjectsScreen() {
  const { projects, deleteProject, loading, clearAllProjects } = useProjects();
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLocale();
  const [deleteTarget, setDeleteTarget] = useState<import('../../context/ProjectsContext').Project | null>(null);
  const [clearAllVisible, setClearAllVisible] = useState(false);

  const handleExportProject = async (project: import('../../context/ProjectsContext').Project) => {
    const uri = project.data?.pdfUri as string | undefined;
    if (!uri) {
      Alert.alert(
        t('projects.export.notAvailable'),
        t('projects.export.noPdfMessage')
      );
      return;
    }
    try {
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert(
          t('projects.export.exported'),
          `${t('projects.export.storedAt')}\n${uri}`
        );
        return;
      }
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: t('projects.export.shareTitle'),
      });
    } catch (error) {
      console.warn('Failed to share project PDF', error);
      Alert.alert(
        t('projects.export.failed'),
        t('projects.export.failedMessage')
      );
    }
  };

  const handleDeleteProject = (project: import('../../context/ProjectsContext').Project) => {
    setDeleteTarget(project);
  };

  const handleEditProject = (project: import('../../context/ProjectsContext').Project) => {
    let pathname = '/(stacks)/(house)/single-storey';

    if (project.type === 'single-house') {
      pathname = '/(stacks)/(house)/single-storey';
    } else if (project.type === 'multi-house') {
      const floors = project.data?.meta?.floors as number | undefined;
      if (floors === 4) {
        pathname = '/(stacks)/(house)/four-storey';
      } else if (floors === 3) {
        pathname = '/(stacks)/(house)/three-storey';
      } else {
        pathname = '/(stacks)/(house)/two-storey';
      }
    }

    router.push({
      pathname,
      params: { projectId: project.id },
    });
  };

  if (loading) {
    return (
      <>
        <TabHeader titleKey="tab.projects" />
        <ScreenWrapper scrollable={false}>
          <View style={[styles.container, { backgroundColor: colors.screen_background }]}>
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
            <View style={styles.skeletonCard} />
          </View>
        </ScreenWrapper>
      </>
    );
  }

  if (!projects.length) {
    return (
      <>
        <TabHeader titleKey="tab.projects" />
        <ScreenWrapper scrollable={false}>
          <View style={[styles.emptyContainer, { backgroundColor: colors.screen_background }]}>
            <View style={[styles.emptyIconWrapper, { backgroundColor: colors.card }]}>
              <Feather name="folder-plus" size={40} color={colors.primary_color} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.heading_text }]}>
              {t('projects.empty.title')}
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.muted_text }]}>
              {t('projects.empty.subtitle')}
            </Text>
            <Pressable
              style={[styles.emptyCta, { backgroundColor: colors.primary_color }]}
              onPress={() => router.push('/home')}
            >
              <Text style={[styles.emptyCtaText, { color: colors.white }]}>
                {t('projects.empty.cta')}
              </Text>
            </Pressable>
          </View>
        </ScreenWrapper>
      </>
    );
  }

  const handleClearAll = () => {
    setClearAllVisible(true);
  };

  return (
    <>
      <TabHeader titleKey="tab.projects" onLongPress={handleClearAll} />
      <ConfirmModal
        visible={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={t('projects.delete.title') || 'Delete project'}
        message={t('projects.delete.message') || 'Are you sure you want to delete this project? This cannot be undone.'}
        confirmText={t('common.delete') || 'Delete'}
        onConfirm={() => deleteTarget && deleteProject(deleteTarget.id)}
        confirmDanger
        cancelText={t('common.cancel') || 'Cancel'}
      />
      <ConfirmModal
        visible={clearAllVisible}
        onClose={() => setClearAllVisible(false)}
        title={t('projects.clearAll.title') || 'Clear all projects'}
        message={t('projects.clearAll.message') || 'Delete all saved projects? This cannot be undone.'}
        confirmText={t('common.delete') || 'Delete'}
        onConfirm={() => clearAllProjects()}
        confirmDanger
        cancelText={t('common.cancel') || 'Cancel'}
      />
      <ScreenWrapper scrollable={false}>
        <View style={[styles.container, { backgroundColor: colors.screen_background }]}>
          <FlatList
            data={projects}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <ProjectCard
                title={item.title}
                createdAt={item.createdAt}
                summary={item.summary}
                onPress={() => handleEditProject(item)}
                onExport={() => handleExportProject(item)}
                onEdit={() => handleEditProject(item)}
                onDelete={() => handleDeleteProject(item)}
              />
            )}
          />
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
    gap: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyCta: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  emptyCtaText: {
    fontSize: 14,
    fontWeight: '600',
  },
  skeletonCard: {
    height: 90,
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#E5E7EB',
    opacity: 0.6,
  },
});
