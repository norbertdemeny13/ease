/* eslint-disable */
interface App {
  appName: string;
  appLogoImage: string;
}

interface Layout {
  isRTL: boolean;
  skin: string;
  routerTransition: string;
  type: string;
  contentWidth: string;
  menu: any;
  navbar: any;
  footer: any;
  customizer: boolean;
  enableScrollToTop: boolean;
}

interface Config {
  app: App;
  layout: Layout;
}

interface BreakPoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// Theme Colors
// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
export const $themeColors = {};

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {} as BreakPoints;

// APP CONFIG
export const $themeConfig: Config = {
  app: {
    appName: 'Ease', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/svg/ease-logo-pink.svg'), // Will update logo in navigation menu (Branding)
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'zoom-fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: '', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: true,
    enableScrollToTop: true,
  },
};
