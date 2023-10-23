import d from './simmpcom_post_archive_db';
import { PostData } from '@/contexts/posts';
import {filter, from} from 'rxjs'

var data:any = [...d];

var postsData = d.filter((d:any) => d[d.length-2] == 'post').map((post:any):PostData => {
    return {
        id: post[0].toString(),
        data: {
            titulo: post[5].toString(),
            data: {seconds: new Date(post[2].toString()).getTime()/1000, nanoseconds: 0},
            texto: post[4].toString(),
            destaque: false,
            capa: 'logo incompleta verde.png',
            categories: [post[11].toString()],
            galeria: []
        }
    }
});


data.filter((d:(string|number)[]) => d[d.length-2] == 'attachment')
.forEach((d:any[]) => {
    let el = postsData.findIndex((i:PostData) => i.id == d[d.length-5]);
    if(postsData[el] !== undefined){
        postsData[el].data.capa = d[d.length-4];
    }
})



export async function GET(request: Request) {
    return Response.json({ data: postsData })
}