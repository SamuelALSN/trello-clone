import Vue from 'vue'
import Router from 'vue-router'
import Board from '../views/Board.vue'
import Task from '../views/Task'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
