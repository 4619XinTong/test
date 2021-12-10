import { createRouter, createWebHistory } from "vue-router";
const student =()=>import('../views/student/student')
const teacher =()=>import('../views/teacher/teacher')
const classRoom =()=>import('../views/classroom/classRoom')
const Jiaoshi =()=>import('../views/schoolroom/Jiaoshi')
import back from "../views/student/back";
import back1 from "../views/classroom/back1";
import back2 from "../views/schoolroom/back2";
const routes = [
  {
    path: '',
    redirect:'/student'
  },
  {
    path: "/student",
    name:'student',
    component: student,
  },
  {
    path: "/teacher",
    component: teacher,
  },
  {
    path: '/classRoom',
    name:'classRoom',
    component: classRoom,
  },
  {
    path: '/Jiaoshi',
    name:"Jiaoshi",
    component:Jiaoshi,
  },
  {
    path: '/back',
    component:back
  },
  {
    path: '/back1',
    component:back1
  }, {
    path: '/back2',
    component: back2
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
