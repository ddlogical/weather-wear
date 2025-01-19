import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/util/colors";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          colors: {
            cold: colors.blue.base,
            hot: colors.yellow.lighten1,
            accent: '#ECFAFF',
            background: colors.shades.white,
          },
        },
        'light-hot': {
          colors: {
            cold: colors.blue.base,
            hot: colors.yellow.lighten1,
            accent: '#ECFAFF',
            background: '#FFFFF5'
          },
        },
        'light-cold': {
          colors: {
            cold: colors.blue.base,
            hot: colors.yellow.lighten1,
            accent: '#ECFAFF',
            background: '#FBFEFF',
          },
        },
        dark: {
          colors: {
            cold: colors.blue.darken4,
            hot: colors.yellow.darken2,
            accent: '#595959',
            background: colors.grey.darken4,
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
