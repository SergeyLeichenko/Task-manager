import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import TasksView from "../views/TasksView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
          meta: {
            title: "Login",
            guestOnly: true,
          },
        },
        { path: "", redirect: "/dashboard" },
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardView,
          meta: { title: "Dashboard" },
        },
        { path: "tasks", name: "tasks", component: TasksView, meta: { title: "Tasks" } },
      ],
    },
  ],
});

// Global navigation guard
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Якщо сторінка потребує авторизації
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  // Якщо користувач вже авторизований
  // і намагається відкрити Login
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;
