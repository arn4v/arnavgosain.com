export function PostOGImage({ title }) {
  return (
    <div
      style={{
        height: "1200px",
        width: "630px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
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
        }}
      />
      <div
        style={{
          top: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <h1>{title}</h1>
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <img
            src="https://arnavgosain.com/static/display.jpg"
            style={{ height: 80, width: 80, borderRadius: 9999 }}
          />
          <p>Arnav Gosain</p>
        </div>
      </div>
    </div>
  );
}
