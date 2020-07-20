<template>
  <AppDrop
    @drop="moveTaskOrColumn"
    >
    <AppDrag
       class="task"
       :transferData="{
          type: 'task',
          fromColumnIndex: columnIndex,
          fromTaskIndex: taskIndex
        }"
        @click="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
        <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
          {{ task.description }}
        </p>
    </AppDrag>
  </AppDrop>
  </template>

<script>
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
export default {
  name: 'BoardTask',
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
    // /**
    //  * @param e is the drag event
    //  * @param taskIndex
    //  * @param fromColumnIndex
    //  * @constructor allow us to pick a task
    //  */
    // pickupTask (e, taskIndex, fromColumnIndex) {
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'
    //   e.dataTransfer.setData('from-task-index', taskIndex)
    //   e.dataTransfer.setData('from-column-index', fromColumnIndex)
    //   e.dataTransfer.setData('type', 'task')
    // }
  }
}
</script>

  <style scoped>
    .task {
      @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }
  </style>
