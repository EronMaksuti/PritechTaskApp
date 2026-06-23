import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TasksContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/emptyState';
import FilterBar from '../components/FilterBar';
import { fetchDailyTip } from '../api/tipApi';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

const TaskListScreen = () => {
    const navigation = useNavigation<Nav>();
  const { tasks, deleteTask, toggleStatus, searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useTasks();
  const [tip, setTip] = useState('');

  useEffect(() => {
    fetchDailyTip().then(data => setTip(data.tip));
  }, []);

  const filtered = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePress = (task: Task) => {
    navigation.navigate('TaskDetail', { task });
  };

  return (
    <View style={styles.container}>
      {tip ? (
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>💡 Daily Tip</Text>
          <Text style={styles.tipText} numberOfLines={3}>{tip}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FilterBar current={filterStatus} onChange={setFilterStatus} />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleStatus}
            onDelete={deleteTask}
            onPress={handlePress}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tipBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  tipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 32,
  },
});

export default TaskListScreen;