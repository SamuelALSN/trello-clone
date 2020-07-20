<template>
  <div
    class="task"
    @dragstart="pickupTask($event,taskIndex,columnIndex)"
    @click="goToTask(task)"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
   >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </div>
  </template>

<script>
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin'

export default {
  name: 'BoardTask',
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    /**
     * @param e is the drag event
     * @param taskIndex
     * @param fromColumnIndex
     * @constructor allow us to pick a task
     */
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    }
  }
}
</script>

  <style scoped>

  </style>
