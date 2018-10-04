import {environment} from "../../environments/environment";

export const googleAnalytics = () => {
  if (!environment.googleAnalytics || environment.gaTrackingCode.length === 0) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.innerHTML = `
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', '${environment.gaTrackingCode}', 'auto');
  `;
  document.body.appendChild(script);
};
