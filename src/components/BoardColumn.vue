<template>
  <AppDrop @drop="moveTaskOrColumn">
  <AppDrag
    class="column"
    :transfer-data="{
     type: 'column',
     fromColumnIndex: columnIndex
   }">
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>

      <div class="list-reset">
        <BoardTask
          v-for="(task,$taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
          :column="column"
          :board="board"/>
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
  </AppDrag>
  </AppDrop>
</template>

<script>
import BoardTask from './BoardTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin'
export default {
  name: 'BoardColumn',
  components: {
    BoardTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
      // clear input
      e.target.value = ''
    }
    // pickupColumn (e, columnIndex) {
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'
    //   e.dataTransfer.setData('from-column-index', columnIndex)
    //   e.dataTransfer.setData('type', 'column')
    // }
  }
}
</script>

<style scoped>

</style>
