import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from './components/PluginIcon';

const { name, displayName } = pluginPkg.strapi;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: displayName,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "github-publish" */ './pages/HomePage');

        return component;
      },
    });
    app.registerPlugin({
      id: pluginId,
      name,
      initializer: Initializer,
      isReady: false,
    })
  },

  async registerTrads({ locales }) {
   const importedTrads = await Promise.all(
     locales.map(locale => {
       return import(`./translations/${locale}.json`)
         .then(({ default: data }) => {
           return {
             data: prefixPluginTranslations(data, pluginId),
             locale,
           };
         })
         .catch(() => {
           return {
             data: {},
             locale,
           };
         });
     })
   );

   return Promise.resolve(importedTrads);
 },
};
