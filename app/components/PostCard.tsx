import { PostData } from "@/contexts/posts"
import { Card, CardHeader, Box } from "@chakra-ui/react"
import { CardMedia, CardContent, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function({data}:{data:PostData}) {
    const router = useRouter();
    console.log(data)
    if (!data.id) {
        return <></>
    }
    const subTexto = data.data.texto ? data.data.texto.substring(0, 200) : "";
    const dataPub = data.data ? (new Date(data.data.data.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })).toString() : ""
    return(
        <Card className="post-card transition-all"
            onClick={()=>{router.push(`/Post?id=${data.id}`)}}
            sx={{ cursor:"pointer", display: "flex", flexDirection: "row", gridArea: "destaque", width: "115%" }}
        >
            <CardMedia
                sx={{ flexBasis: "200%", backgroundPosition: "left", backgroundSize: "cover" }}
                image={data.data.capa}
                title={data.data.titulo}
            />
            <Box
                sx={{ display: 'flex', flexDirection: "column" }}
            >
                <CardHeader
                    title={data.data.titulo}
                />
                <CardContent style={{ height: "100%" }}>
                    <Typography variant="body2" color="text.secondary" style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <div className="destaque-body" dangerouslySetInnerHTML={{ __html: subTexto+"..." }}></div>
                        <Link href={`/Post?id=${data.id}`} style={{ textAlign: "right" }}>ler na integra...</Link>
                    </Typography>
                </CardContent>

            </Box>
        </Card >
    )
}