/* eslint-disable */
import { $themeBreakpoints } from '@/utils/theme-config';

export default {
  watch: {
    $route() {
      if (this.$store.state.app.windowWidth < $themeBreakpoints.xl) {
        this.isVerticalMenuActive = false;
      }
    },
  },
};
