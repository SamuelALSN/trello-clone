<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column ,$columnIndex) of board.columns"
        :key="$columnIndex"
        :columnIndex="$columnIndex"
        :column="column"
        :board="board"/>
<!--      <div-->
<!--        class="column"-->
<!--        v-for="(column, $columnIndex) of board.columns"-->
<!--        :key="$columnIndex"-->
<!--        draggable-->
<!--        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"-->
<!--        @dragover.prevent-->
<!--        @dragenter.prevent-->
<!--        @dragstart.self="pickupColumn($event, $columnIndex)"-->
<!--      >-->
<!--        <div class="flex items-center mb-2 font-bold">-->
<!--          {{ column.name }}-->
<!--        </div>-->

<!--        <div class="list-reset">-->
<!--          <div-->
<!--            class="task"-->
<!--            v-for="(task, $taskIndex) of column.tasks"-->
<!--            :key="$taskIndex"-->
<!--            draggable-->
<!--            @dragstart="pickupTask($event,$taskIndex,$columnIndex)"-->
<!--            @click="goToTask(task)"-->
<!--            @dragover.prevent-->
<!--            @dragenter.prevent-->
<!--            @drop.stop="moveTaskOrColumn($event, column.tasks,  $columnIndex, $taskIndex,)"-->
<!--          >-->
<!--            <span class="w-full flex-no-shrink font-bold">-->
<!--              {{ task.name }}-->
<!--            </span>-->
<!--            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">-->
<!--              {{ task.description }}-->
<!--            </p>-->
<!--          </div>-->
<!--          <input-->
<!--            type="text"-->
<!--            class="block p-2 w-full bg-transparent"-->
<!--            placeholder="+ Enter new task"-->
<!--            @keyup.enter="createTask($event, column.tasks)"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          v-model="newColumnName"
          placeholder="New column name "
         @keyup.enter="createColumn">
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'

export default {
  name: 'Board',
  components: { BoardColumn },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    },
    close () {
      this.$router.push({ name: 'board' })
    }
  }

}
</script>

<style lang="css">
  .task {
    @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  }

  .column {
    @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
  }

  .board {
    @apply p-4 bg-teal-dark h-full overflow-auto;
  }

  .task-bg {
    @apply pin absolute;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
