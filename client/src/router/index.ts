import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import TasksView from "../views/TasksView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "", redirect: "/dashboard" },
        {
          path: "dashboard",
          component: DashboardView,
          meta: { title: "Dashboard" },
        },
        { path: "tasks", component: TasksView, meta: { title: "Tasks" } },
      ],
    },
  ],
});
