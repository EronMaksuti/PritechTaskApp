import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks } from '../context/TasksContext';
import { validateTask } from '../utils/validation';
import ScreenHeader from '../components/ScreenHeader';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const error = validateTask(title, description);
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }
    addTask(title, description);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScreenHeader
        title="Create Task"
        subtitle="Add a new task to your list"
        showBack
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Task Title</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor="#6B7280"
              value={title}
              onChangeText={setTitle}
              maxLength={60}
              returnKeyType="next"
            />
            <Text style={styles.charCount}>{title.length}/60</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Description</Text>
          <View style={styles.textareaWrapper}>
            <TextInput
              style={styles.textarea}
              placeholder="Add details about your task..."
              placeholderTextColor="#6B7280"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={200}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/200</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity style={styles.btn} onPress={handleAdd}>
              <Text style={styles.btnText}>Create Task</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textareaWrapper: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
    minHeight: 140,
  },
  input: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    padding: 0,
    minHeight: 22,
  },
  textarea: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    padding: 0,
    minHeight: 100,
  },
  charCount: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 12,
    gap: 12,
  },
  gradientButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  btn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cancelBtn: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  cancelBtnText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default AddTaskScreen;
