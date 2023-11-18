const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "shoppingCart",
        name: "shoppingCart",
        component: () => import("pages/ShoppingCartPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
