import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskStatus } from '../types/Task';

interface Props {
  current: TaskStatus | 'all';
  onChange: (status: TaskStatus | 'all') => void;
}

const FILTERS: { label: string; value: TaskStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'not_completed' },
];

const FilterBar: React.FC<Props> = ({ current, onChange }) => {
  return (
    <View style={styles.container}>
      {FILTERS.map(f => (
        <TouchableOpacity
          key={f.value}
          style={[styles.btn, current === f.value && styles.btnActive]}
          onPress={() => onChange(f.value)}
        >
          <Text style={[styles.label, current === f.value && styles.labelActive]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  btn: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: '#0d1f2a',
    borderColor: '#00d4ff',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  labelActive: {
    color: '#00d4ff',
  },
});

export default FilterBar;