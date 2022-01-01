import { styled } from "@stitches/react";
import * as React from "react";

const Wrapper = styled("div", {
  height: "1200px",
  width: "630px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  position: "relative",
  padding: "0 64px",
});

const Background = styled("div", {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage:
    "radial-gradient(#000000 2px, transparent 2px), radial-gradient(#000000 2px, #ffffff 2px)",
  opacity: 0.2,
  backgroundColor: "#ffffff",
  backgroundSize: "80px 80px",
  backgroundPosition: "0 0,40px 40px",
  zIndex: 1,
});

const Title = styled("h1", {});

const Author = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
});

const ProfileImage = styled("img", {});

const Name = styled("p", {});

export function PostOGImage({ title }) {
  return (
    <Wrapper>
      <Background />
      <Title>{title}</Title>
      <Author css={{ marginTop: "32px" }}>
        <ProfileImage src="/static/display.jpg" />
        <Name>Arnav Gosain</Name>
      </Author>
    </Wrapper>
  );
}
