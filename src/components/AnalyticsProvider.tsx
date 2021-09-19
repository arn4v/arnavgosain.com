import GoogleAnalytics, { GAnalytics as IGAnalytics } from "ganalytics";
import { useRouter } from "next/router";
import * as React from "react";

const Analytics = ({ trackerId }: { trackerId: string }) => {
  const analytics = React.useRef<IGAnalytics>(null);
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
