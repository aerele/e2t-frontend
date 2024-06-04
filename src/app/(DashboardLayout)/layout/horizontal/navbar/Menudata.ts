import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/',
    children: [
      {
        id: uniqueId(),
        title: 'login',
        icon: IconPoint,
        href: '/',
        chip: 'New',
        chipColor: 'secondary',
      },
      {
        id: uniqueId(),
        title: 'eCommerce',
        icon: IconPoint,
        href: '/dashboards/ecommerce',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Apps',
    icon: IconApps,
    href: '/apps/',
    children: [
      {
        id: uniqueId(),
        title: 'Contacts',
        icon: IconPoint,
        href: '/apps/contacts',
      },
      {
        id: uniqueId(),
        title: 'Chats',
        icon: IconPoint,
        href: '/apps/chats',
      },
      {
        id: uniqueId(),
        title: 'Notes',
        icon: IconPoint,
        href: '/apps/notes',
      },
      {
        id: uniqueId(),
        title: 'Calendar',
        icon: IconPoint,
        href: '/apps/calendar',
      },
      {
        id: uniqueId(),
        title: 'Email',
        icon: IconPoint,
        href: '/apps/email',
      },
      {
        id: uniqueId(),
        title: 'Tickets',
        icon: IconPoint,
        href: '/apps/tickets',
      },
      {
        id: uniqueId(),
        title: 'User Profile',
        icon: IconPoint,
        href: '/user-profile',
        children: [
          {
            id: uniqueId(),
            title: 'Profile',
            icon: IconPoint,
            href: '/user-profile',
          },
          {
            id: uniqueId(),
            title: 'Followers',
            icon: IconPoint,
            href: '/apps/followers',
          },
          {
            id: uniqueId(),
            title: 'Friends',
            icon: IconPoint,
            href: '/apps/friends',
          },
          {
            id: uniqueId(),
            title: 'Gallery',
            icon: IconPoint,
            href: '/apps/gallery',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Ecommerce',
        icon: IconPoint,
        href: '/apps/ecommerce/',
        children: [
          {
            id: uniqueId(),
            title: 'Shop',
            icon: IconPoint,
            href: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/ecommerce/detail/1',
          },
          {
            id: uniqueId(),
            title: 'List',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-product-list',
          },
          {
            id: uniqueId(),
            title: 'Checkout',
            icon: IconPoint,
            href: '/apps/ecommerce/eco-checkout',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Blog',
        icon: IconPoint,
        href: '/apps/blog/',
        children: [
          {
            id: uniqueId(),
            title: 'Posts',
            icon: IconPoint,
            href: '/apps/blog/posts',
          },
          {
            id: uniqueId(),
            title: 'Detail',
            icon: IconPoint,
            href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Pages',
    icon: IconClipboard,
    href: '/ui-components/',
    children: [
      {
        id: uniqueId(),
        title: 'Roll Base Access',
        icon: IconPoint,
        href: '/theme-pages/casl',
      },
      {
        id: uniqueId(),
        title: 'Treeview',
        icon: IconPoint,
        href: '/theme-pages/treeview',
      },
      {
        id: uniqueId(),
        title: 'Pricing',
        icon: IconPoint,
        href: '/theme-pages/pricing',
      },
      {
        id: uniqueId(),
        title: 'Account Setting',
        icon: IconPoint,
        href: '/theme-pages/account-settings',
      },
      {
        id: uniqueId(),
        title: 'FAQ',
        icon: IconPoint,
        href: '/theme-pages/faq',
      },
      {
        id: uniqueId(),
        title: 'Widgets',
        icon: IconPoint,
        href: '/widgets/cards',
        children: [
          {
            id: uniqueId(),
            title: 'Cards',
            icon: IconPoint,
            href: '/widgets/cards',
          },
          {
            id: uniqueId(),
            title: 'Banners',
            icon: IconPoint,
            href: '/widgets/banners',
          },
          {
            id: uniqueId(),
            title: 'Charts',
            icon: IconPoint,
            href: '/widgets/charts',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Ui',
        icon: IconPoint,
        href: '/ui-components/alert',
        children: [
          {
            id: uniqueId(),
            title: 'Alert',
            icon: IconPoint,
            href: '/ui-components/alert',
          },
          {
            id: uniqueId(),
            title: 'Accordion',
            icon: IconPoint,
            href: '/ui-components/accordion',
          },
          {
            id: uniqueId(),
            title: 'Avatar',
            icon: IconPoint,
            href: '/ui-components/avatar',
          },
          {
            id: uniqueId(),
            title: 'Chip',
            icon: IconPoint,
            href: '/ui-components/chip',
          },
          {
            id: uniqueId(),
            title: 'Dialog',
            icon: IconPoint,
            href: '/ui-components/dialog',
          },
          {
            id: uniqueId(),
            title: 'List',
            icon: IconPoint,
            href: '/ui-components/list',
          },
          {
            id: uniqueId(),
            title: 'Popover',
            icon: IconPoint,
            href: '/ui-components/popover',
          },
          {
            id: uniqueId(),
            title: 'Rating',
            icon: IconPoint,
            href: '/ui-components/rating',
          },
          {
            id: uniqueId(),
            title: 'Tabs',
            icon: IconPoint,
            href: '/ui-components/tabs',
          },
          {
            id: uniqueId(),
            title: 'Tooltip',
            icon: IconPoint,
            href: '/ui-components/tooltip',
          },
          {
            id: uniqueId(),
            title: 'Transfer List',
            icon: IconPoint,
            href: '/ui-components/transfer-list',
          },
          {
            id: uniqueId(),
            title: 'Typography',
            icon: IconPoint,
            href: '/typography',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Charts',
        icon: IconPoint,
        href: '/charts/',
        children: [
          {
            id: uniqueId(),
            title: 'Line',
            icon: IconPoint,
            href: '/charts/line-chart',
          },
          {
            id: uniqueId(),
            title: 'Gredient',
            icon: IconPoint,
            href: '/charts/gredient-chart',
          },
          {
            id: uniqueId(),
            title: 'Area',
            icon: IconPoint,
            href: '/charts/area-chart',
          },
          {
            id: uniqueId(),
            title: 'Candlestick',
            icon: IconPoint,
            href: '/charts/candlestick-chart',
          },
          {
            id: uniqueId(),
            title: 'Column',
            icon: IconPoint,
            href: '/charts/column-chart',
          },
          {
            id: uniqueId(),
            title: 'Doughtnut & Pie',
            icon: IconPoint,
            href: '/charts/doughnut-pie-chart',
          },
          {
            id: uniqueId(),
            title: 'RadialBar & Radar',
            icon: IconPoint,
            href: '/charts/radialbar-chart',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Auth',
        icon: IconPoint,
        href: '/400',
        children: [
          {
            id: uniqueId(),
            title: 'Error',
            icon: IconAlertCircle,
            href: '/400',
          },
          {
            id: uniqueId(),
            title: 'Maintenance',
            icon: IconSettings,
            href: '/auth/maintenance',
          },
          {
            id: uniqueId(),
            title: 'Login',
            icon: IconLogin,
            href: '/login',
            children: [
              {
                id: uniqueId(),
                title: 'Side Login',
                icon: IconPoint,
                href: '/login',
              },
              {
                id: uniqueId(),
                title: 'Boxed Login',
                icon: IconPoint,
                href: 'auth/auth2/login',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Register',
            icon: IconUserPlus,
            href: '/auth/auth1/register',
            children: [
              {
                id: uniqueId(),
                title: 'Side Register',
                icon: IconPoint,
                href: '/auth/auth1/register',
              },
              {
                id: uniqueId(),
                title: 'Boxed Register',
                icon: IconPoint,
                href: '/auth/auth2/register',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Forgot Password',
            icon: IconRotate,
            href: '/auth/auth1/forgot-password',
            children: [
              {
                id: uniqueId(),
                title: 'Side Forgot Password',
                icon: IconPoint,
                href: '/auth/auth1/forgot-password',
              },
              {
                id: uniqueId(),
                title: 'Boxed Forgot Password',
                icon: IconPoint,
                href: '/auth/auth2/forgot-password',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Two Steps',
            icon: IconZoomCode,
            href: '/auth/auth1/two-steps',
            children: [
              {
                id: uniqueId(),
                title: 'Side Two Steps',
                icon: IconPoint,
                href: '/auth/auth1/two-steps',
              },
              {
                id: uniqueId(),
                title: 'Boxed Two Steps',
                icon: IconPoint,
                href: '/auth/auth2/two-steps',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Forms',
    icon: IconFileDescription,
    href: '/forms/form-elements/autocomplete',
    children: [
      {
        id: uniqueId(),
        title: 'Form Elements',
        icon: IconPoint,
        href: '/forms/form-elements/autocomplete',
        children: [
          {
            id: uniqueId(),
            title: 'Autocomplete',
            icon: IconPoint,
            href: '/forms/form-elements/autocomplete',
          },
          {
            id: uniqueId(),
            title: 'Button',
            icon: IconPoint,
            href: '/forms/form-elements/button',
          },
          {
            id: uniqueId(),
            title: 'Radio',
            icon: IconPoint,
            href: '/forms/form-elements/radio',
          },
          {
            id: uniqueId(),
            title: 'Date Time',
            icon: IconPoint,
            href: '/forms/form-elements/date-time',
          },
          {
            id: uniqueId(),
            title: 'Slider',
            icon: IconPoint,
            href: '/forms/form-elements/slider',
          },
          {
            id: uniqueId(),
            title: 'Switch',
            icon: IconPoint,
            href: '/forms/form-elements/switch',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Form Layout',
        icon: IconPoint,
        href: '/forms/form-layouts',
      },
      {
        id: uniqueId(),
        title: 'Form Horizontal',
        icon: IconPoint,
        href: '/forms/form-horizontal',
      },
      {
        id: uniqueId(),
        title: 'Form Vertical',
        icon: IconPoint,
        href: '/forms/form-vertical',
      },
      {
        id: uniqueId(),
        title: 'Form Custom',
        icon: IconPoint,
        href: '/forms/form-custom',
      },
      {
        id: uniqueId(),
        title: 'Form Wizard',
        icon: IconPoint,
        href: '/forms/form-wizard',
      },
      {
        id: uniqueId(),
        title: 'Form Validation',
        icon: IconPoint,
        href: '/forms/form-validation',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Tables',
    icon: IconBorderAll,
    href: '/tables/',
    children: [
      {
        id: uniqueId(),
        title: 'Basic',
        icon: IconPoint,
        href: '/tables/basic',
      },
      {
        id: uniqueId(),
        title: 'Collapsible',
        icon: IconPoint,
        href: '/tables/collapsible',
      },
      {
        id: uniqueId(),
        title: 'Enhanced',
        icon: IconPoint,
        href: '/tables/enhanced',
      },
      {
        id: uniqueId(),
        title: 'Fixed Header',
        icon: IconPoint,
        href: '/tables/fixed-header',
      },
      {
        id: uniqueId(),
        title: 'Pagination',
        icon: IconPoint,
        href: '/tables/pagination',
      },
      {
        id: uniqueId(),
        title: 'E2tMapping',
        icon: IconPoint,
        href: '/tables/e2tmapping',
      },
      {
        id: uniqueId(),
        title: 'Search',
        icon: IconPoint,
        href: '/tables/search',
      },
    ],
  },
];
export default Menuitems;
