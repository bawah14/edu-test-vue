const internalMenu = [
  {
    title: 'Beranda',
    id: 'dashboard',
    url: '/dashboard',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Dashboard')
  },
  {
    title: 'Pembayaran',
    id: 'payment',
    url: '/payment',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Payment')
  },
  {
    title: 'Password',
    id: 'password',
    url: '/update-password',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Applicant')
  }
]

const externalMenu = [
  {
    title: 'Beranda',
    id: 'dashboard',
    url: '/dashboard',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Dashboard')
  },
  {
    title: 'Pemohon',
    id: 'applicant',
    url: '/applicant',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Applicant')
  },
  {
    title: 'Pembayaran',
    id: 'payment',
    url: '/payment',
    icon: () => import(/* webpackChunkName: "Icons" */ '@/components/Icons/Payment')
  }
]

export { externalMenu, internalMenu }
