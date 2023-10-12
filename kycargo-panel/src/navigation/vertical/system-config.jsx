import { Pointer, Award, House2, Category2, Buildings2,Box2,Box } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const systemConfig = [
    {
        header: <IntlMessages id="system-config" />,
    },
    // {
    //     id: "packages",
    //     title: <IntlMessages id="packages" />,
    //     icon: <Box size={18} />,
    //     navLink: "/system-config/packages",
    // },
    {
        id: "warehouses",
        title: <IntlMessages id="warehouses" />,
        icon: <House2 size={18} />,
        navLink: "/system-config/warehouses",
    },
    {
        id: "user-interface-buttons",
        title: <IntlMessages id="departments" />,
        icon: <Buildings2 size={18} />,
        navLink: "/components/general/buttons",
    },
    {
        id: "user-interface-components",
        title: <IntlMessages id="product-types" />,
        icon: <Category2 size={18} />,
        navLink: "/system-config/products",
    },
   /* {
        id: "charts",
        title: <IntlMessages id="box-types" />,
        icon: <Box2 size={18} />,
        navLink: "/main/widgets/charts",
    },*/
    {
        id: "user-interface-icons",
        title: <IntlMessages id="service-points" />,
        icon: <Pointer size={18} />,
        children: [
            {
                id: "user-interface-remix-icons",
                title: <IntlMessages id="countries" />,
                navLink: "/components/general/icons",
            },
            {
                id: "illustration-set",
                title: <IntlMessages id="cities" />,
                navLink: "/main/widgets/illustration-set",
            }
        ]
    },
];

export default systemConfig