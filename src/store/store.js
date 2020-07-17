import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { uuid, saveStatePlugin } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('boards')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    /**
     * @param state
     * @param tasks
     * @param name  is the new created task
     * @ the last 2 params is the payload object
     */
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },

    /**
     * @param state
     * @param fromTasks is the column (that contains many tasks) from which we will drag the task
     * @param toTasks  is the column where will be droped the tasks
     * @param taskIndex  the selected tasks index in the list of tasks
     * @constructor
     */
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      console.log(taskToMove, toTaskIndex)
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    /**
     * @param state
     * @param fromColumnIndex is the index of the column we want to move
     * @param toColumnIndex is the index where we want to move our column
     * @constructor
     */
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)
      columnList.splice(toColumnIndex, 0, columnToMove[0])
    }
  }
})
