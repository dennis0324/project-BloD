import { PostInfo } from "@src/interfaces/blog-title"
import styles from '@src/styles/blog.module.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// getting dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)

async function getHeadPosts(id:string):Promise<{err:number,data:PostInfo[],length:number}> {
  const res = await fetch(`http://localhost:3000/api/blogposts?page=${id}&postCount=${5}`,{
    // cache: "no-cache" //this need to be set to no-cace to avoid not updating the data
    //max-age=120
    headers:{
      'cache-control': 'no-cache'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return await res.json() 
}
export async function generateStaticParams() {
  const res = await fetch(`http://localhost:3000/api/blogposts?foramt=length&postCount=0`,{
    // cache: "no-cache" //this need to be set to no-cace to avoid not updating the data
    //max-age=120
    headers:{
      'cache-control': 'no-cache'
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return Array(data.data.length).map((_,i) => {
    return {
      id: `${i}`
    }
  })
}

async function getImage(res:any){
  const output = []
  for(const element of res.data){
    const res = await fetch(`http://localhost:3000/api/thumbnail?messageID=${element.id}`)
    const data = await res.json()
    output.push(data)
  }
  return output
}




export default async function Page({ params }: { params: { id: string } }) {
  const data = await getHeadPosts(params.id)
  const image = await getImage(data)
  
  return (
    <div className="">
      {
        data.data.map((element,index) => {
          const date = dayjs(element.createAt)
          return (
            <div key={element.id} className="grid grid-cols-6 gap-x-6 gap-y-3 my-4">
              <div className="col-span-full space-y-3 lg:col-span-5">
                <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
                  {element.name}
                </h1>
              <p className="line-clamp-3 font-medium text-gray-500">글 작성 날짜:{date.tz('asia/seoul').format('YYYY-MM-DD HH:mm:ss')}</p>
              <p className="line-clamp-3 font-medium text-gray-500">{element.preface}</p>
              </div>
              <div className="-order-1 col-span-full lg:order-none lg:col-span-1">
                {image[index].data.url ? <img className={styles.img} src={image[index].data.url}></img> : <div className={styles.dummyImg}></div>}
              </div>
          </div>
          )
        })
      }
    </div>

  );
}