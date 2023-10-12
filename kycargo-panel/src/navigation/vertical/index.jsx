import dashboards from "./dashboards";
import apps from "./apps";
import pages from "./pages";
import userInterface from "./user-interface";
import systemConfig from "./system-config";
import shipmentProcess from "./shipment-process";
import transferProcess from "./transfer-process";

const navigation = [...dashboards,/* ...apps, */...shipmentProcess, ...transferProcess, ...systemConfig];

export default navigation