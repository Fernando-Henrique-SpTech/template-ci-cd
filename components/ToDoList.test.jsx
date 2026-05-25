import { TouchableOpacity } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { TodoList } from './ToDoList';

describe('TodoList', () => {
    let getByTestId;
    let getByText;
    let getAllByText;
    let queryByTestId;
    let UNSAFE_getAllByType;

    beforeEach(() => {
        ({
            getByTestId,
            getByText,
            getAllByText,
            queryByTestId,
            UNSAFE_getAllByType,
        } = render(<TodoList initialTodos={[{ text: 'Tarefa 1', done: false }]} />));
    });

    test('deve adicionar uma nova tarefa', () => {
        const inputNovaTarefa = getByTestId('input-new');
        const botaoAdicionar = getByTestId('button-add');

        fireEvent.changeText(inputNovaTarefa, 'Nova Tarefa');
        fireEvent.press(botaoAdicionar);

        expect(getByText('Nova Tarefa')).toBeTruthy();
        expect(getByTestId('todo-1')).toBeTruthy();
        expect(inputNovaTarefa.props.value).toBe('');
        expect(getByText('Andamento')).toBeTruthy();
    });

    test('deve remover uma tarefa da lista', async () => {
        const botaoRemover = getByTestId('button-remove-0');

        fireEvent.press(botaoRemover);

        await waitFor(() => {
            expect(queryByTestId('todo-0')).toBeNull();
        });

        expect(getByText('Nenhuma tarefa')).toBeTruthy();
    });

    test('deve alternar estado e rótulo do botão toggle', () => {
        expect(getByText('Finalizado')).toBeTruthy();

        const botaoToggle = getByTestId('button-toggle-0');
        fireEvent.press(botaoToggle);

        expect(getByText('Andamento')).toBeTruthy();

        const tarefa = getByTestId('todo-0');
        expect(tarefa.props.style).toContainEqual({ textDecorationLine: 'line-through', color: '#999' });
    });

    test('UNSAFE_getAllByType lista touchables corretamente', () => {
        const touchables = UNSAFE_getAllByType(TouchableOpacity);
        expect(touchables.length).toBeGreaterThanOrEqual(4);
    });

    test('não deve adicionar tarefa com texto vazio', () => {
        fireEvent.press(getByTestId('button-add'));
        expect(queryByTestId('todo-1')).toBeNull();
    });

    test('deve editar e salvar uma tarefa', () => {
        fireEvent.press(getByTestId('button-edit-0'));

        const inputEdicao = getByTestId('input-edit-0');
        fireEvent.changeText(inputEdicao, 'Tarefa Editada');
        fireEvent.press(getByTestId('button-save-0'));

        expect(getByText('Tarefa Editada')).toBeTruthy();
        expect(queryByTestId('input-edit-0')).toBeNull();
    });

    test('não deve salvar edição com texto vazio', () => {
        fireEvent.press(getByTestId('button-edit-0'));

        fireEvent.changeText(getByTestId('input-edit-0'), '');
        fireEvent.press(getByTestId('button-save-0'));

        expect(getByTestId('input-edit-0')).toBeTruthy();
    });

    test('deve cancelar edição sem alterar a tarefa', () => {
        fireEvent.press(getByTestId('button-edit-0'));
        fireEvent.changeText(getByTestId('input-edit-0'), 'Texto descartado');
        fireEvent.press(getByTestId('button-cancel-0'));

        expect(getByText('Tarefa 1')).toBeTruthy();
        expect(queryByTestId('input-edit-0')).toBeNull();
    });

    test('deve renderizar com lista vazia por padrão', () => {
        const { getByTestId: getById } = render(<TodoList />);
        expect(getById('empty')).toBeTruthy();
    });

    test('deve preservar tarefas não afetadas ao alternar e ao salvar edição', () => {
        const { getByTestId: getById, getByText: getByTxt } = render(
            <TodoList initialTodos={[
                { text: 'Tarefa A', done: false },
                { text: 'Tarefa B', done: false },
            ]} />
        );

        fireEvent.press(getById('button-toggle-0'));
        expect(getById('todo-1')).toBeTruthy();

        fireEvent.press(getById('button-edit-0'));
        fireEvent.changeText(getById('input-edit-0'), 'Tarefa A Editada');
        fireEvent.press(getById('button-save-0'));

        expect(getByTxt('Tarefa A Editada')).toBeTruthy();
        expect(getByTxt('Tarefa B')).toBeTruthy();
    });
});