import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const ScreenHeader = ({ title, subtitle, showBack }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#0F0F1E', '#1a1a2e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + 16 }]}
    >
      {showBack ? (
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backBtn: {
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00d4ff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});

export default ScreenHeader;
