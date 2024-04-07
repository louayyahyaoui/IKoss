const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'products',
          title: 'Product List',
          type: 'item',
          icon: 'feather icon-server',
          url: '/product/list'
        },
        {
          id: 'add-product',
          title: 'Add Product',
          type: 'item-add',
          icon: 'feather icon-server',
          url: '/product/add'
        }
      ]
    }
  ]
};

export default menuItems;
