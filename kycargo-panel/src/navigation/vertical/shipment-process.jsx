import { Award, AddCircle, BoxAdd, Box } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const shipmentProcess = [
    {
        header: <IntlMessages id="shipment-process" />,
    },
    {
        id: "packages",
        title: <IntlMessages id="packages" />,
        icon: <Box size={18} />,
        navLink: "/shipping/packages",
    },
    {
        id: "new",
        title: <IntlMessages id="create-new-shipment" />,
        icon: <AddCircle size={18} />,
        navLink: "/shipping/new",
    },
    {
        id: "all",
        title: <IntlMessages id="all-shipments" />,
        icon: <Box size={18} />,
        navLink: "/shipping/all",
    },
    {
        id: "received",
        title: <IntlMessages id="received-shipments" />,
        icon: <Box size={18} />,
        navLink: "/shipping/received",
    },
    {
        id: "in-warehouse",
        title: <IntlMessages id="shipments-in-warehouse" />,
        icon: <Box size={18} />,
        navLink: "/shipping/in-warehouse",
    },
    {
        id: "in-vehicle",
        title: <IntlMessages id="shipments-in-vehicle" />,
        icon: <Box size={18} />,
        navLink: "/shipping/in-vehicle",
    },
    {
        id: "outgoing",
        title: <IntlMessages id="outgoing-shipments" />,
        icon: <Box size={18} />,
        navLink: "/shipping/outgoing",
    },
    {
        id: "delivered",
        title: <IntlMessages id="delivered-shipments" />,
        icon: <Box size={18} />,
        navLink: "/shipping/delivered",
    },
    {
        id: "tracking",
        title: <IntlMessages id="shipment-tracking" />,
        icon: <Box size={18} />,
        navLink: "/shipping/tracking",
    },
];

export default shipmentProcess