import { array } from "yup";

export const priceData = [
    {
        _id: 0,
        name:"₹0 to 499",
        array: [0, 500]
    },
    {
        _id: 1,
        name:"₹500 to 999",
        array: [500, 1000]
    },
    {
        _id: 2,
        name:"₹1000 to 1999",
        array: [1000, 2000]
    },
    {
        _id: 3,
        name:"₹2000 to more",
        array: [2000, 10000000]
    }
]

export const sortData = [
    {
        _id: 0,
        name: "Price: Low to High",
        value: {"price": 1}
    },
    {
        _id: 1,
        name: "Price: High to Low",
        value: {"price": -1}
    },
    {
        _id: 3,
        name: "Rating: Low to High",
        value: {"rating": 1}
    },
    {
        _id: 4,
        name: "Rating: High to Low",
        value: {"rating": -1}
    },
    {
        _id: 2,
        name: "Latest Product",
        value: {"createdAt": -1}
    }
]

export const AdminSidebarData = [
    {
        href: "/admin/dashboard",
        title: "Home",
        icon: 'dashboard'
    },
    {
        href: "/admin/categories",
        title: "Categories",
        icon: 'category'
    },
    {
        href: "/admin/products",
        title: "Products",
        icon: 'product'
    },
    {
        href: "/admin/orders",
        title: "Orders",
        icon: 'order'
    },
    {
        href: "/admin/users",
        title: "Users",
        icon: 'user'
    },
    {
        href: "/admin/sellers",
        title: "Sellers",
        icon:'seller'
    }
    
]

export const SellerSidebarData = [
    {
        href: "/seller/dashboard",
        title: "Home",
        icon: 'dashboard'
    },
    {
        href: "/seller/categories",
        title: "Categories",
        icon: 'category'
    },
    {
        href: "/seller/products",
        title: "Products",
        icon: 'product'
    },
    {
        href: "/seller/orders",
        title: "Orders",
        icon: 'order'
    },
    
]

export const teamMembers = [
    {
      name: "John Doe",
      occupation: "CEO & Web Developer",
      imageUrl: "https://res.cloudinary.com/freestyle07/image/upload/v1719214995/to-his-surprise-ethan-was-chosen-as-one-of-the-finalists-this-meant-he-would-receive-mentorship-fr-161622308_g056z2.png",
      about: "John drives the technical strategy of the urban nest platform and brand."
    },
    {
      name: "zainab Asha",
      occupation: "Lead Designer",
      imageUrl: "https://res.cloudinary.com/freestyle07/image/upload/v1719215403/to-her-surprise-eva-was-chosen-as-one-of-the-finalists-this-meant-he-would-receive-mentorship-from-895988017_btvmjn.png",
      about: "Zainab oversees all design aspects of the platform."
    },
    {
      name: "Tanjiro Kamado",
      occupation: "Marketing Manager",
      imageUrl: "https://res.cloudinary.com/freestyle07/image/upload/v1719215411/to-his-surprise-eva-was-chosen-as-one-of-the-finalists-this-meant-he-would-receive-mentorship-from-591950538_utfcu5.png",
      about: "Tanjiro is responsible for the marketing and outreach of UrbanNest."
    },
    {
      name: "Tebogo Molefi",
      occupation: "Customer Support Lead",
      imageUrl: "https://res.cloudinary.com/freestyle07/image/upload/v1719215825/to-his-surprise-eva-was-chosen-as-one-of-the-finalists-this-meant-he-would-receive-mentorship-from-456071748_w8bep3.png",
      about: "Alice ensures that our customers receive top-notch support."
    }
  ];
  