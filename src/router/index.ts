import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import SystemResourcePanel from "@/components/pages/resource-panel/SystemResourcePanel.vue";
import NodeManagerInformation from "@/components/pages/NodeManagerInformation.vue";
import FileSystemPage from "@/components/pages/file-system/FileSystemPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            component: HomePage,
        },
        {
            path: "/resource",
            name: "SystemResourcePanel",
            component: SystemResourcePanel,
        },
        {
            path: "/node-manager-information",
            name: 'NodeManagerInformation',
            component: NodeManagerInformation,
            props: route => ({ ...route.query })
        },
        {
            path: "/explore",
            name: "FileSystemPage",
            component: FileSystemPage,
            props: route => ({ path: route.query.path })
        }

    ]
});

export default router;