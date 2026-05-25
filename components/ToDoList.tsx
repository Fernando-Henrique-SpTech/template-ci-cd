import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import type { Todo, TodoListProps } from "./types";

export function TodoList({ initialTodos = [] }: TodoListProps) {
  const [tarefas, setTarefas] = useState<Todo[]>(initialTodos);
  const [novoTexto, setNovoTexto] = useState("");
  const [indiceEdicao, setIndiceEdicao] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  function adicionarTarefa() {
    const texto = novoTexto.trim();
    if (!texto) return;

    setTarefas([...tarefas, { text: texto, done: true }]);
    setNovoTexto("");
  }

  function removerTarefa(index: number) {
    setTarefas(tarefas.filter((_: Todo, i: number) => i !== index));
  }

  function alternarTarefa(index: number) {
    setTarefas(
      tarefas.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  }

  function iniciarEdicao(index: number) {
    setIndiceEdicao(index);
    setTextoEdicao(tarefas[index]!.text);
  }

  function cancelarEdicao() {
    setIndiceEdicao(null);
    setTextoEdicao("");
  }

  function salvarEdicao(index: number) {
    const text = textoEdicao.trim();
    if (!text) return;
    setTarefas(tarefas.map((t, i) => (i === index ? { ...t, text } : t)));
    cancelarEdicao();
  }

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          testID="input-new"
          style={styles.input}
          placeholder="Nova tarefa"
          value={novoTexto}
          onChangeText={setNovoTexto}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa} testID="button-add">
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {tarefas.length === 0 && (
        <Text testID="empty" style={styles.emptyText}>
          Nenhuma tarefa
        </Text>
      )}
      <FlatList<Todo>
        data={tarefas}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            {indiceEdicao === index ? (
              <>
                <TextInput
                  testID={`input-edit-${index}`}
                  style={[styles.input, { flex: 1 }]}
                  value={textoEdicao}
                  onChangeText={setTextoEdicao}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => salvarEdicao(index)}
                  testID={`button-save-${index}`}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={cancelarEdicao}
                  testID={`button-cancel-${index}`}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  testID={`todo-${index}`}
                  style={[styles.todoText, item.done && styles.todoTextDone]}
                >
                  {item.text}
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => alternarTarefa(index)}
                  testID={`button-toggle-${index}`}
                >
                  <Text style={styles.buttonText}>{item.done ? "Andamento" : "Finalizado"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => iniciarEdicao(index)}
                  testID={`button-edit-${index}`}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => removerTarefa(index)}
                  testID={`button-remove-${index}`}
                >
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        keyExtractor={(_: Todo, index: number) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoTextDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  button: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
