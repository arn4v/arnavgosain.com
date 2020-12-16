import CustomLink from "~/components/CustomLink";
import Image from "next/image";
import { NextSeo } from "next-seo";
import PageLayout from "~/components/PageLayout";
import axios from "axios";
import { baseUrl } from "~/config";

const url = baseUrl + "/playlists";
const title = "Playlists - Arnav Gosain";
const description =
  "Playlists I have curated month over month for the last 4 years.";

export default function PlaylistsPage({ playlists }) {
  return (
    <>
      <PageLayout breadcrumb={{ Playlists: "/playlists" }}>
        <NextSeo
          title={title}
          description={description}
          canonical={url}
          openGraph={{ title, url, description }}
        />
        <div className="flex flex-col space-y-6">
          {Object.entries(playlists)
            .reverse()
            .map(([key, value]) => {
              return (
                <div
                  key={`${key}_${Object.keys(playlists).indexOf(key)}`}
                  className="flex flex-col space-y-4"
                >
                  <h1 className="text-2xl font-semibold dark:text-white">
                    {key}
                  </h1>
                  <div className="grid grid-cols-4 grid-flow-cols gap-4">
                    {Object.entries(value)
                      .reverse()
                      .map(([month, _value]) => {
                        return (
                          <CustomLink
                            key={`${key}_${month}`}
                            href={_value["href"]}
                          >
                            <div
                              style={{
                                backgroundImage: `url(${_value.img})`,
                                backgroundPosition: "center",
                              }}
                              className="box-border flex items-center rounded-md shadow-md overflow-hidden relative"
                            >
                              <div
                                className="m-3.5 font-medium text-black bg-cyan-200 z-10"
                              >
                                {month}
                              </div>
                            </div>
                          </CustomLink>
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
  let playlists = require("../data/homepage/playlists").default;
  const accessToken = (
    await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      params: {
        refresh_token,
        grant_type: "refresh_token",
        // grant_type: "authorization_code",
        // code: process.env.SPOTIFY_AUTHORIZATION_CODE,
        // redirect_uri: "https://arnavgosain.com/callback",
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

  for (const [key, value] of Object.entries(playlists)) {
    for (const [_key, _value] of Object.entries(value)) {
      let id = _value;
      if (id.includes("https://open.spotify.com/playlist"))
        id = id.replace("https://open.spotify.com/playlist/", "");
      let img = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/playlists/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      img = img["data"]["images"][0]["url"];
      playlists[key][_key] = { href: _value, img };
    }
  }

  return {
    props: {
      playlists,
    },
  };
}
