import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconNetwork,
  IconFileExport,
  IconTransfer,
  IconHelpSquare,
  IconAlbum
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Connected Sites",
    icon: IconNetwork,
    chip: "10",
    chipColor: "secondary",
    href: "/home",
  },
  {
    id: uniqueId(),
    title: "Export to Tally",
    icon: IconFileExport,
    href: "/erp2tally",
  },

  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconTransfer,
    href: "/payment-page",
  },
  {
    id: uniqueId(),
    title: "Support",
    icon: IconHelpSquare,
    href: "/apps/ecommerce/",
  },
  {
    id: uniqueId(),
    title: "About",
    icon: IconAlbum,
    href: "/",
  },
  
];

export default Menuitems;
