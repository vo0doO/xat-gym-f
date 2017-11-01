import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Add_new_program from '@/components/Add_new_program'
import My_programs from '@/components/My_programs'
import Delete_program from '@/components/Delete_program'
import Current_program from '@/components/Current_program'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/addNewProgram',
      name: 'Add_New_Program',
      component: Add_new_program
    },
    {
      path: '/myPrograms',
      name: 'my_programs',
      component: My_programs
    },
    {
      path: '/program/:id',
      name: 'Current_program',
      component: Current_program
    }
  ]
})

router.beforeEach(beforeEach)

export default router
