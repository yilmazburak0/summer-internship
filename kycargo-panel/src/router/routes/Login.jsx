import { lazy } from "react";

const PagesRoutes = [
    {
        path: "/auth/login",
        component: lazy(() => import("../../view/pages/authentication/login")),
        layout: "FullLayout",
    },
    {
        path: "/auth/recover-password",
        component: lazy(() =>
            import("../../view/pages/authentication/recover-password")
        ),
        layout: "FullLayout",
    },
    {
        path: "/auth/register",
        component: lazy(() => import("../../view/pages/authentication/register")),
        layout: "FullLayout",
    },
    {
        path: "/auth/reset-password",
        component: lazy(() =>
            import("../../view/pages/authentication/reset-password")
        ),
        layout: "FullLayout",
    },
];

export default PagesRoutes;