const permission = [
  {
    groupTitle: 'Order Management',
    list: [
      {
        title: 'Create Order',
        id: 'order_management.create_order'
      },
      {
        title: 'View Order',
        id: 'order_management.view_order'
      },
      {
        title: 'List Order',
        id: 'order_management.list_order'
      }
    ]
  },
  {
    groupTitle: 'AWB Tracking',
    list: [
      {
        title: 'Track AWB Linknau',
        id: 'awb_tracking.track_linknau_awb'
      },
      {
        title: 'Track AWB Partner',
        id: 'awb_tracking.track_partner_awb'
      }
    ]
  },
  {
    groupTitle: 'Role Management',
    list: [
      {
        title: 'View List',
        id: 'role_management.view_list'
      },
      {
        title: 'View Details',
        id: 'role_management.view_detail'
      },
      {
        title: 'Create New',
        id: 'role_management.create'
      },
      {
        title: 'Edit',
        id: 'role_management.update'
      },
      {
        title: 'Delete',
        id: 'role_management.delete'
      }
    ]
  },
  {
    groupTitle: 'Partner Management - Profile',
    list: [
      {
        title: 'Add New',
        id: 'partner_management.add_new_partner'
      },
      {
        title: 'Update',
        id: 'partner_management.update_partner_info'
      },
      {
        title: 'Delete',
        id: 'partner_management.delete_partner'
      },
      {
        title: 'Deactivate',
        id: 'partner_management.deactivate_partner'
      },
      {
        title: 'Activate',
        id: 'partner_management.activate_partner'
      },
      {
        title: 'Revoke API Key',
        id: 'partner_management.revoke_api_key'
      },
      {
        title: 'Generate API Key',
        id: 'partner_management.generate_api_key'
      },
      {
        title: 'View Profile',
        id: 'partner_management.view_partner'
      },
      {
        title: 'List Profile',
        id: 'partner_management.list_partner'
      }
    ]
  },
  {
    groupTitle: 'Partner Management - User Management',
    list: [
      {
        title: 'View List',
        id: 'partner_user_management.view_list'
      },
      {
        title: 'View Details',
        id: 'partner_user_management.view_detail'
      },
      {
        title: 'Create New',
        id: 'partner_user_management.create'
      },
      {
        title: 'Edit',
        id: 'partner_user_management.update'
      },
      {
        title: 'Delete',
        id: 'partner_user_management.delete'
      },
      {
        title: 'Revoke Session',
        id: 'partner_user_management.revoke_session'
      },
      {
        title: 'List Session',
        id: 'partner_user_management.list_session'
      },
      {
        title: 'Change Password',
        id: 'partner_user_management.change_password'
      },
      {
        title: 'Deactivate / Activate',
        id: 'partner_user_management.set_active_status'
      },

      {
        title: 'Verify Account',
        id: 'partner_user_management.verify_account'
      }
    ]
  },
  {
    groupTitle: 'Partner Management - Driver Management',
    list: [
      {
        title: 'View List',
        id: 'partner_driver_management.view_list'
      },
      {
        title: 'View Details',
        id: 'partner_driver_management.view_detail'
      },
      {
        title: 'Create New',
        id: 'partner_driver_management.create'
      },
      {
        title: 'Edit',
        id: 'partner_driver_management.update'
      },
      {
        title: 'Delete',
        id: 'partner_driver_management.delete'
      },
      {
        title: 'Revoke Session',
        id: 'partner_driver_management.revoke_session'
      },
      {
        title: 'List Session',
        id: 'partner_driver_management.list_session'
      },
      {
        title: 'Suspend',
        id: 'partner_driver_management.suspend'
      },
      {
        title: 'Release Suspend',
        id: 'partner_driver_management.release_suspension'
      },
      {
        title: 'Change Password',
        id: 'partner_driver_management.change_password'
      },
      {
        title: 'Deactivate / Activate',
        id: 'partner_driver_management.set_active_status'
      },
      {
        title: 'Verify Account',
        id: 'partner_driver_management.verify_account'
      }
    ]
  },
  {
    groupTitle: 'Partner Management - Dropoff Agent Management',
    list: [
      {
        title: 'View List',
        id: 'partner_dropoff_agent_management.view_list'
      },
      {
        title: 'View Details',
        id: 'partner_dropoff_agent_management.view_detail'
      },
      {
        title: 'Create New',
        id: 'partner_dropoff_agent_management.create'
      },
      {
        title: 'Edit',
        id: 'partner_dropoff_agent_management.update'
      },
      {
        title: 'Delete',
        id: 'partner_dropoff_agent_management.delete'
      }
    ]
  },
  {
    groupTitle: 'Delivery Management - Cost Mapping',
    list: [
      {
        title: 'View List',
        id: 'delivery_cost_mapping.view_list'
      },
      {
        title: 'View Details',
        id: 'delivery_cost_mapping.view_detail'
      },
      {
        title: 'Create New',
        id: 'delivery_cost_mapping.create'
      },
      {
        title: 'Edit',
        id: 'delivery_cost_mapping.update'
      },
      {
        title: 'Delete',
        id: 'delivery_cost_mapping.delete'
      }
    ]
  },
  {
    groupTitle: 'Delivery Management - Package Management',
    list: [
      {
        title: 'View List',
        id: 'delivery_package_management.view_list'
      },
      {
        title: 'View Details',
        id: 'delivery_package_management.view_detail'
      },
      {
        title: 'Create New',
        id: 'delivery_package_management.create'
      },
      {
        title: 'Edit',
        id: 'delivery_package_management.update'
      },
      {
        title: 'Delete',
        id: 'delivery_package_management.delete'
      },
      {
        title: 'Deactivate / Activate',
        id: 'delivery_package_management.set_active_status'
      }
    ]
  },
  {
    groupTitle: 'Master Data - City',
    list: [
      {
        title: 'View List',
        id: 'master_data_city.view_list'
      },
      {
        title: 'View Details',
        id: 'master_data_city.view_detail'
      },
      {
        title: 'Create New',
        id: 'master_data_city.create'
      },
      {
        title: 'Edit',
        id: 'master_data_city.update'
      },
      {
        title: 'Delete',
        id: 'master_data_city.delete'
      }
    ]
  },
  {
    groupTitle: 'Master Data - Payment Methods',
    list: [
      {
        title: 'View List',
        id: 'master_data_payment_methods.view_list'
      },
      {
        title: 'View Details',
        id: 'master_data_payment_methods.view_detail'
      },
      {
        title: 'Create New',
        id: 'master_data_payment_methods.create'
      },
      {
        title: 'Edit',
        id: 'master_data_payment_methods.update'
      },
      {
        title: 'Delete',
        id: 'master_data_payment_methods.delete'
      }
    ]
  },
  {
    groupTitle: 'Master Data - Goods Category',
    list: [
      {
        title: 'View List',
        id: 'master_data_goods_category.view_list'
      },
      {
        title: 'View Details',
        id: 'master_data_goods_category.view_detail'
      },
      {
        title: 'Create New',
        id: 'master_data_goods_category.create'
      },
      {
        title: 'Edit',
        id: 'master_data_goods_category.update'
      },
      {
        title: 'Delete',
        id: 'master_data_goods_category.delete'
      }
    ]
  },
  {
    groupTitle: 'Master Data - Permissions',
    list: [
      {
        title: 'List Permission',
        id: 'master_data_permissions.list'
      }
    ]
  },
  {
    groupTitle: 'Pertashop Management - Local Agent',
    list: [
      {
        title: 'View List',
        id: 'pertashop_local_agent.view_list '
      },
      {
        title: 'View Details',
        id: 'pertashop_local_agent.view_detail'
      },
      {
        title: 'Create New',
        id: 'pertashop_local_agent.create'
      },
      {
        title: 'Edit',
        id: 'pertashop_local_agent.update'
      },
      {
        title: 'Delete',
        id: 'pertashop_local_agent.delete'
      }
    ]
  }
]
export default permission
