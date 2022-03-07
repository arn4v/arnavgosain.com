import GoogleAnalytics from "ganalytics";
import { useRouter } from "next/router";
import * as React from "react";

const Analytics = ({ trackerId }: { trackerId: string }) => {
  const [analytics] = React.useState(() =>
    GoogleAnalytics(trackerId, {
      aid: "1",
    })
  );
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      analytics.send("pageview");
    };

    router.events.on("routeChangeComplete", onRouteChange);

    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [analytics, router.events, trackerId]);

  return null;
};

export default Analytics;
