
import { NextResponse } from 'next/server'
import { json } from 'stream/consumers'
 
export async function POST(req: any) {
    const {id} = await req.json()
    const dataFetching = await fetch(`http://192.168.0.253:4000/product/productdetail?productId=${id}`, {cache:'force-cache', method: 'GET'})
    const data = await dataFetching.json()
    console.log(data)
     return NextResponse.json(data, 
     {
      status: 200,
      headers: {  
        'Content-Type': 'application/json',
      },
     }
  )
}