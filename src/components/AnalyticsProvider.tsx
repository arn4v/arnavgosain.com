import * as React from "react";
import { useRouter } from "next/router";
import GoogleAnalytics, { GAnalytics as GAnalyticsInterface } from "ganalytics";
import { isProd } from "~/config";

const Analytics = ({ trackerId }: { trackerId: string }) => {
  const analytics = React.useRef<GAnalyticsInterface>(null);
  const router = useRouter();
  const onRouteChange = React.useCallback(() => {
    analytics.current.send("pageview");
  }, []);

  React.useEffect(() => {
    if (!analytics.current) {
      analytics.current = GoogleAnalytics(trackerId);
    }

    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [onRouteChange, router.events, trackerId]);

  return null;
};

export default Analytics;
