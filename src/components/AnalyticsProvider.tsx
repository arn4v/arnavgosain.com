import GoogleAnalytics, { GAnalytics as IGAnalytics } from "ganalytics";
import { useRouter } from "next/router";
import * as React from "react";

const Analytics = ({ trackerId }: { trackerId: string }) => {
  const [analytics, setAnalytics] = React.useState<IGAnalytics>(
    GoogleAnalytics(trackerId)
  );
  const router = useRouter();
  const onRouteChange = React.useCallback(() => {
    analytics.send("pageview");
  }, [analytics]);

  React.useEffect(() => {
    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [onRouteChange, router.events, trackerId]);

  return null;
};

export default Analytics;
