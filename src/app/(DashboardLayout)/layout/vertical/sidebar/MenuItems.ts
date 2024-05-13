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
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Connected Sites",
    icon: IconShoppingCart,
    chip: "2",
    chipColor: "secondary",
    href: "/home",
  },
  {
    id: uniqueId(),
    title: "Export to Tally",
    icon: IconPackage,
    href: "/apps/contacts",
  },

  {
    id: uniqueId(),
    title: "Invoices",
    icon: IconChartDonut3,
    href: "/payment-page",
    // children: [
    //   {
    //     id: uniqueId(),
    //     title: "Posts",
    //     icon: IconPoint,
    //     href: "/apps/blog/post",
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "Detail",
    //     icon: IconPoint,
    //     href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
    //   },
    // ],
  },
  {
    id: uniqueId(),
    title: "Support",
    icon: IconBasket,
    href: "/apps/ecommerce/",
    // children: [
    //   {
    //     id: uniqueId(),
    //     title: "Shop",
    //     icon: IconPoint,
    //     href: "/apps/ecommerce/shop",
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "Detail",
    //     icon: IconPoint,
    //     href: "/apps/ecommerce/detail/1",
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "List",
    //     icon: IconPoint,
    //     href: "/apps/ecommerce/list",
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "Checkout",
    //     icon: IconPoint,
    //     href: "/apps/ecommerce/checkout",
    //   },
    // ],
  },
  {
    id: uniqueId(),
    title: "About",
    icon: IconMessage2,
    href: "/apps/chats",
  },
  
];

export default Menuitems;
