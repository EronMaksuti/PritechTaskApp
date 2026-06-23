import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/Task';
import { formatDate } from '../utils/date';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onPress }: Props) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => onPress(task)}>
        <View style={styles.left}>
          <TouchableOpacity
            style={[
              styles.circle,
              task.status === 'completed' && styles.circleCompleted,
            ]}
            onPress={() => onToggle(task.id)}
          />
        </View>
  
        <View style={styles.middle}>
          <Text
            style={[
              styles.title,
              task.status === 'completed' && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Text>
  
          <Text style={styles.date}>
            {formatDate(task.createdDate)}
          </Text>
        </View>
  
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.deleteText}>✕</Text>
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
  },
  circleCompleted: {
    backgroundColor: '#00d4ff',
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
  deleteText: {
    fontSize: 16,
    color: '#EF4444',
  },
});

export default TaskItem;