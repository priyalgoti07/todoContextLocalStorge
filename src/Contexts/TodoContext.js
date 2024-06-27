import { useContext } from "react";
import { createContext } from "react";

export const TodoContect = createContext({
    todos: [{
        id: 1,
        todoTitle: "Todo msg",
        checked: false
    }],
    addTodos: (todo) => { },
    updatedTodo: (id, todo) => { },
    deletedTodo: (id) => { },
    toggleTodo: (id) => { }
})

export const useTodo = () => {
    return useContext(TodoContect)
}

export const TodoProvider = TodoContect.Provider