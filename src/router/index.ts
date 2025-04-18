import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/components/pages/HomePage.vue";
import SystemResourcePanel from "@/components/pages/resource-panel/SystemResourcePanel.vue";
import NodeManagerInformation from "@/components/pages/NodeManagerInformation.vue";
import FileSystemPage from "@/components/pages/file-system/FileSystemPage.vue";
import SetupPage from "@/components/pages/setup/SetupPage.vue";
import HadoopSetupPage from "@/components/pages/setup/HadoopSetupPage.vue";
import OverviewPage from "@/components/pages/hadoop/overview-page/OverviewPage.vue";
import DatanodesPage from "@/components/pages/hadoop/datanode-info-page/DatanodesPage.vue";
import DatanodeVolumeFailuresPage from "@/components/pages/hadoop/DatanodeVolumeFailuresPage.vue";
import SnapshotPage from "@/components/pages/hadoop/SnapshotPage.vue";
import StartupProgressPage from "@/components/pages/hadoop/StartupProgressPage.vue";

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
            props: route => ({...route.query})
        },
        {
            path: "/explore",
            name: "FileSystemPage",
            component: FileSystemPage,
            props: route => ({path: route.query.path})
        },
        {
            path: "/setup",
            children: [
                {
                    path: "",
                    component: SetupPage
                },
                {
                    path: "hadoop",
                    component: HadoopSetupPage
                }
            ]
        },
        {
            path: "/hadoop",
            children: [
                {
                    path: "",
                    component: OverviewPage
                },
                {
                    path: "overview",
                    component: OverviewPage
                },
                {
                    path: "datanodes",
                    component: DatanodesPage,
                },
                {
                    path: "datanode-volume-failures",
                    component: DatanodeVolumeFailuresPage
                },
                {
                    path: "snapshot",
                    component: SnapshotPage
                },
                {
                    path: "startup-progress",
                    component: StartupProgressPage
                }
            ]
        }

    ]
});

export default router;