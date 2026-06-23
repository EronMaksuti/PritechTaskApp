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
    marginBottom: 14,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  btnActive: {
    backgroundColor: '#4F46E5',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  labelActive: {
    color: '#fff',
  },
});

export default FilterBar;