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
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TasksContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import ScreenHeader from '../components/ScreenHeader';
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
      <ScreenHeader
        title="Tasks"
        subtitle="Manage your daily priorities"
      />

      {/* Premium Tip Box */}
      {tip ? (
        <LinearGradient
          colors={['#1a2f3a', '#0d1f2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tipBox}
        >
          <Text style={styles.tipLabel}>✨ Daily Insight</Text>
          <Text style={styles.tipText} numberOfLines={3}>{tip}</Text>
          <View style={styles.tipAccent} />
        </LinearGradient>
      ) : null}

      {/* Search Input - Premium Style */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search tasks..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
      </View>

      {/* Filter Bar */}
      <FilterBar current={filterStatus} onChange={setFilterStatus} />

      {/* Task List */}
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
        contentContainerStyle={styles.listContent}
      />

      {/* Premium FAB with gradient */}
      <LinearGradient
        colors={['#00d4ff', '#0099cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fabGradient}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  tipBox: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#00d4ff',
    overflow: 'hidden',
  },
  tipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00d4ff',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: 13,
    color: '#E5E7EB',
    lineHeight: 19,
    fontWeight: '500',
  },
  tipAccent: {
    width: 60,
    height: 1,
    backgroundColor: '#00d4ff',
    marginTop: 12,
    opacity: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    position: 'relative',
  },
  search: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchIcon: {
    position: 'absolute',
    right: 26,
    top: 12,
  },
  searchIconText: {
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  fabGradient: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00d4ff',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fab: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 32,
  },
});

export default TaskListScreen;
