import axios from "axios";
import Link from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { baseUrl, isProd } from "~/constants";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {Object} props.playlists
 */
export default function PlaylistsPage({ playlists }) {
  const openGraph = {
    url: baseUrl + "/playlists",
    title: "Playlists | Arnav Gosain",
    description:
      "Playlists I have curated month over month for the last 4 years.",
  };

  return (
    <>
      <PageLayout
        breadcrumb={{ Playlists: "/playlists" }}
        seo={{
          title: openGraph.title,
          description: openGraph.description,
          canonical: openGraph.url,
          openGraph: openGraph,
        }}
      >
        <h1 className="text-3xl font-bold dark:text-white font-mono hidden lg:block mb-8">
          Playlists
        </h1>
        <div className="flex flex-col space-y-6">
          {Object.entries(playlists)
            .reverse()
            .map(([key, value]) => {
              return (
                <div
                  key={`${key}_${Object.keys(playlists).indexOf(key)}`}
                  className="flex flex-col space-y-4"
                >
                  <a id={key} href={`#${key}`} className="relative mr-auto">
                    <h1 className="text-2xl font-semibold dark:text-white hover:bg-cyan-200 transition">
                      {key}
                    </h1>
                  </a>
                  <div className="grid grid-cols-3 lg:grid-cols-4 grid-flow-cols gap-4">
                    {Object.entries(value).map(([month, _value]) => {
                      return (
                        <Link key={`${key}_${month}`} href={_value["href"]}>
                          <div
                            style={{
                              backgroundImage: `url(${_value.img})`,
                              backgroundPosition: "center",
                            }}
                            className="box-border px-2.5 lg:px-3.5 py-3.5 flex items-center rounded-md shadow-md overflow-hidden relative"
                          >
                            <div className="font-medium text-black bg-cyan-200 z-10">
                              {month}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const playlistsData = await fetch(
    "https://notion-api.splitbee.io/v1/table/da624e18ea514216893e5e1037f6b76e"
  ).then((res) => res.json());

  const transformedData = playlistsData.reduce((acc, cur) => {
    const year = parseInt(cur.Year);
    acc[year] = {
      ...(acc[year] ?? {}),
      [cur?.Month]: cur?.URL,
    };

    return acc;
  }, {});

  if (isProd) {
    const accessToken = (
      await axios({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        params: {
          refresh_token,
          grant_type: "refresh_token",
        },
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    ).data["access_token"];

    for (const [year, monthPlaylistMap] of Object.entries(transformedData)) {
      for (const [month, playlistUrl] of Object.entries(monthPlaylistMap)) {
        const id = playlistUrl.replace(
          "https://open.spotify.com/playlist/",
          ""
        );

        const img = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((res) => res.json());

        transformedData[year][month] = {
          href: playlistUrl,
          img: img["images"][0]["url"],
        };
      }
    }
  }

  return {
    props: {
      playlists: transformedData,
      revalidate: 86400,
    },
  };
}
