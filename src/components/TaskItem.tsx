import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/Task';
import { formatDate } from '../utils/date';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onPress }: Props) => {
  const isCompleted = task.status === 'completed';

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(task)}>
      <View style={styles.left}>
        <TouchableOpacity
          style={[styles.circle, isCompleted && styles.circleCompleted]}
          onPress={() => onToggle(task.id)}
        >
          {isCompleted ? (
            <Ionicons name="checkmark" size={14} color="#0F0F1E" />
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <Text style={[styles.title, isCompleted && styles.titleCompleted]}>
          {task.title}
        </Text>
        <Text style={styles.date}>{formatDate(task.createdDate)}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(task.id)}
      >
        <Ionicons name="trash-outline" size={18} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#374151',
  },
  left: {
    marginRight: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00d4ff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },
  middle: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 6,
  },
});

export default TaskItem;
