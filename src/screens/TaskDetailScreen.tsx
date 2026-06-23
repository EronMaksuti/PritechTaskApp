import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/date';
import ScreenHeader from '../components/ScreenHeader';

type DetailRoute = RouteProp<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailRoute>();
  const { task } = route.params;
  const { deleteTask, toggleStatus } = useTasks();

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const isCompleted = task.status === 'completed';

  return (
    <View style={styles.container}>
      <ScreenHeader title="Task Details" showBack />

      {/* Main Card */}
      <View style={styles.card}>
        {/* Status Badge */}
        <View style={styles.statusRow}>
          <LinearGradient
            colors={isCompleted ? ['#10B981', '#059669'] : ['#F59E0B', '#D97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.badgeGradient}
          >
            <View style={styles.badge}>
              <Ionicons
                name={isCompleted ? 'checkmark-circle' : 'time-outline'}
                size={14}
                color="#FFFFFF"
              />
              <Text style={styles.badgeText}>
                {isCompleted ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </LinearGradient>
          <Text style={styles.date}>{formatDate(task.createdDate)}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: isCompleted ? '100%' : '0%',
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Primary Action - Toggle Status */}
        <LinearGradient
          colors={['#00d4ff', '#0099cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => {
              toggleStatus(task.id);
              navigation.goBack();
            }}
          >
            <Ionicons
              name={isCompleted ? 'refresh-outline' : 'checkmark-circle-outline'}
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.toggleText}>
              {isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Secondary Action - Delete */}
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#FCA5A5" />
          <Text style={styles.deleteText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginBottom: 16,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    color: '#D1D5DB',
    lineHeight: 23,
    fontWeight: '500',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#111827',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 12,
  },
  gradientButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#00d4ff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7F1D1D',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#991B1B',
  },
  deleteText: {
    color: '#FCA5A5',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default TaskDetailScreen;
