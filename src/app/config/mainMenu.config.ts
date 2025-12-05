export interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

export const mainMenuOptions: { admin: MenuItem[]; user: MenuItem[] } = {
  admin: [
    {
      title: 'GRAND PRIX',
      icon: 'calendar',
      url: '/season-calendar',
    },
    {
      title: 'RIDERS',
      icon: 'helmet',
      url: 'riders',
    },
  ],
  user: [
    {
      title: 'GRAND PRIX',
      icon: 'calendar',
      url: '/season-calendar',
    },
    {
      title: 'RIDERS',
      icon: 'helmet',
      url: 'riders',
    },
  ],
};
