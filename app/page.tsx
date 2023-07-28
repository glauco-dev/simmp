import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ODestaque from "./components/ODestaque";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <><main className="container flex min-h-screen flex-col items-center justify-between p-2 max-w-4xl">
      <div id="landing">
          <ODestaque></ODestaque>
        <img src="FME-LOGO(1).png" className="fme"></img>
        <a href="/Galerias" className="galeria">
          <h2 className="h2">Galerias</h2>
          <img src="logo incompleta branca.png" alt="" />
        </a>
        <div className="banners"></div>
      </div>
    </main><Footer></Footer></>
  )
}
