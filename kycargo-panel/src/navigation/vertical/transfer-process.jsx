import { Pointer, Award, House2, Category2, Buildings2, Box2, TruckFast, Calendar, Import } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const transferProcess = [
    {
        header: <IntlMessages id="transfer-process" />,
    },
    {
        id: "vehicles",
        title: <IntlMessages id="vehicles" />,
        icon: <TruckFast size={18} />,
        navLink: "/transfer-process/vehicles",
    },
    {
        id: "vehicle-import",
        title: <IntlMessages id="vehicle-import" />,
        icon: <Import size={18} />,
        navLink: "/transfer-process/import",
    },
    {
        id: "user-interface-buttons",
        title: <IntlMessages id="transport" />,
        icon: <Calendar size={18} />,
        navLink: "/transfer-process/transport",
    }
];

export default transferProcess