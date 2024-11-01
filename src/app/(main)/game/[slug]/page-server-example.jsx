import Script from 'next/script';
export default function Page({ params }) {
  return (
    <div>
    <div className="bg-main flex justify-center rounded-xl">
      <div style={{ width: "640px", height: "480px", maxWidth: "100%" }}>
        <div id="game"></div>
      </div>
    </div>

    <Script id="emulator-config" strategy="beforeInteractive">
      {`
        window.EJS_player = "#game";
        window.EJS_gameUrl = "/mario.zip";
        window.EJS_core = "n64";
        window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
      `}
    </Script>

    <Script 
      src="https://cdn.emulatorjs.org/stable/data/loader.js"
      strategy="afterInteractive"
    />
    </div>
  );
}