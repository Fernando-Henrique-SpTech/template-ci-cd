import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TodoList } from './components/ToDoList';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList initialTodos={[
        { text: 'Tarefa 1', done: false }
      ]}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
