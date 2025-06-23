
import { RIGHTS_MAPPING } from './utilConstants';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentsIcon from '@mui/icons-material/Payments';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const menus = [

    {
        id: 1,
        parentId: null,
        name: "Produsele mele",
        to: "/dashboard/products",
        icon: StoreIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.SELLER],
        order: 90,
        children: [

        ]
    },
    {
        id: 2,
        parentId: null,
        name: "Produse vandute",
        to: "/dashboard/productsSold",
        icon: SellIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.SELLER],
        order: 90,
        children: [

        ]
    },
    {
        id: 3,
        parentId: null,
        name: "Toate produsele",
        to: "/dashboard/allProducts",
        icon: StoreIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 4,
        parentId: null,
        name: "Produse cumparate",
        to: "/dashboard/purchasedProducts",
        icon: LocalMallIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 5,
        parentId: null,
        name: "Oferte castigate",
        to: "/dashboard/offers",
        icon: EmojiEventsIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 6,
        parentId: null,
        name: "Plati",
        to: "/dashboard/payments",
        icon: PaymentsIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER, RIGHTS_MAPPING.SELLER],
        order: 90,
        children: [

        ]

    },
    {
        id: 7,
        parentId: null,
        name: "Comenzi",
        to: "/dashboard/orders",
        icon: ShoppingBagIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]

    },
    {
        id: 8,
        parentId: null,
        name: "Cosul meu",
        to: "/dashboard/shoppingCard",
        icon: ShoppingCartIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.CUSTOMER],
        order: 90,
        children: [

        ]
    },
    {
        id: 9,
        parentId: null,
        name: "Oferte terminate",
        to: "/dashboard/finishedOffers",
        icon: EmojiEventsIcon,
        isCategory: false,
        excludelocationsType: [],
        rights: [RIGHTS_MAPPING.SELLER],
        order: 90,
        children: [

        ]
    },


]
