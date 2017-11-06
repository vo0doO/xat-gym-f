import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Add_new_program from '@/components/Add_new_program'
import My_programs from '@/components/My_programs'
import Delete_program from '@/components/Delete_program'
import Current_program from '@/components/Current_program'
import Start_training from '@/components/Start_training'
import Training from '@/components/Training'
import My_trainings from '@/components/My_trainings'

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
    },
    {
      path: '/startTraining',
      name: 'Start_training',
      component: Start_training
    },
    {
      path: '/training/:id',
      name: 'training',
      component: Training
    },
    {
      path: '/myTrainings',
      name: 'my_trainings',
      component: My_trainings
    }
  ]
})

router.beforeEach(beforeEach)

export default router
