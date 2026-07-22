import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "d2585b0f1dc5d1e878f998ccdc98e741";

export const initializeMixpanel = () => {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,

    track_pageview: true,

    persistence: "localStorage",

    autocapture: true,
  });
};

export default mixpanel;
