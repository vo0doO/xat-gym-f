import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Add_new_program from '@/components/Add_new_program'
import My_programs from '@/components/My_programs'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
