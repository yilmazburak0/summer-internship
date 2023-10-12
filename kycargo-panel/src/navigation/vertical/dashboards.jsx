import { Health, Setting, Grid5,Buildings2 } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const main = [
    {
        header: <IntlMessages id="sidebar-dashboards" />,
    },
    {
        id: "dashboards-analytics",
        title: <IntlMessages id="sidebar-dashboards-analytics" />,
        icon: <Health size={18} />,
        navLink: "/",
    },
    
   /* {
        id: "dashboards-ecommerce",
        title: <IntlMessages id="sidebar-dashboards-ecommerce" />,
        icon: <Setting size={18} />,
        navLink: "/main/dashboard/ecommerce",
    },
    {
        id: "dashboards-nft",
        title: <IntlMessages id="sidebar-dashboards-nft" />,
        icon: <Grid5 size={18} />,
        navLink: "/main/dashboard/nft",
    },*/
];

export default main