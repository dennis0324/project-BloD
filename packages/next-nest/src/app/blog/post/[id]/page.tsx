
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// getting dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// async function getHeadPosts(id:string):Promise<{err:number,data:PostInfo[],length:number}> {
//   const res = await fetch(`http://localhost:3000/api/blogposts?page=${id}&postCount=${5}`,{
//     // cache: "no-cache" //this need to be set to no-cace to avoid not updating the data
//     //max-age=120
//     headers:{
//       'cache-control': 'no-cache'
//     }
//   })

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return await res.json() 
// }
export async function generateStaticParams() {
  const res = await fetch(`http://localhost:3000/api/blogposts?postCount=all`,{
    headers:{
      'cache-control': 'no-cache'
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data.data.map((_,i) => {
    return {
      id: `${i}`
    }
  })
}

async function getPostContent(id:string){
  const res = await fetch(`http://localhost:3000/api/blogpost?messageID=${id}`,{
    headers:{
      'cache-control': 'no-cache'
    }
  })
  const data = await res.json()
  return data
}

type Paragraph = {
  createAt: Date,
  content:string,
  mentions:string[],
  comments?:boolean
  attachments?:string[]
  embeds?:string[]
}


export default async function Page({ params }: { params: { id: string } }) {
  const res = await getPostContent(params.id)
  const blogpost = new Map<string,Paragraph>(JSON.parse(res.data.blogpost))
  // const image = await getImage(data)
  const blogposts = Array.from(blogpost.entries())
  return (
    <div>
      {blogposts.map(([key,value]) => {
        return (
          <div key={key}>
            <div>{value.content}</div>
          </div>
        )
      })}
    </div>

  );
}