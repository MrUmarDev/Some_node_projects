import {
    RT_ADMIN_USERS,
    MT_ADMIN_USERS,
    RT_ADMIN_CATEGORY,
    MT_ADMIN_CATEGORY,
    RT_ADMIN_AUTHOR,
    MT_ADMIN_AUTHOR,
    RT_ADMIN_BOOK,
    MT_ADMIN_BOOK,
} from "../constant/routes.js"
export const adminRoutes = {
    path: "/admin",
    component: () => import("../components/layouts/AdminLayout.vue"),
    children: [
        {
            path: "users",
            name: RT_ADMIN_USERS,
            component: () => import("../layouts/admin/users.vue"),
            meta: {
                title: MT_ADMIN_USERS
            }
        },
        {
            path: "author",
            name: RT_ADMIN_AUTHOR,
            component: () => import("../layouts/admin/add_author.vue"),
            meta: {
                title: MT_ADMIN_AUTHOR
            }
        },
        {
            path: "category",
            name: RT_ADMIN_CATEGORY,
            component: () => import("../layouts/admin/add_category.vue"),
            meta: {
                title: MT_ADMIN_CATEGORY
            }
        },
        {
            path: "book",
            name: RT_ADMIN_BOOK,
            component: () => import("../layouts/admin/add_book.vue"),
            meta: {
                title: MT_ADMIN_BOOK
            }
        },
    ]
}