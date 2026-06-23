import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Task } from '../types/Task';

import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetail: { task: Task };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0F0F1E' },
        }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;