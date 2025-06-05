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
import LogsPage from "@/components/pages/hadoop/LogsPage.vue";
import InstallationPage from "@/components/pages/hadoop/setup-page/InstallationPage.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import RegisterPage from "@/components/pages/RegisterPage.vue";

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
            path: "/logs/:logsName",
            name: "LogsPage",
            component: LogsPage,
            props: true
        },
        {
            path: "/logs",
            name: "LogsPage",
            component: LogsPage,
            props: true
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
                    children: [
                        {path: 'installation', component: InstallationPage},
                    ]
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
                },

            ]
        },
        {
            path:"/login",
            component: LoginPage
        },
        {
            path:'/register',
            component: RegisterPage
        }

    ]
});

export default router;