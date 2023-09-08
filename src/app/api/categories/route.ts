

import { NextResponse } from 'next/server'


export const getFullCategories = async () => {
    const dataFetching = await fetch(`http://192.168.0.253:4000/categories`, {cache:'force-cache', method: 'GET'})
    return await dataFetching.json()
}
 
export async function GET() {
    const data = await getFullCategories()
     return NextResponse.json(data, 
     {
      status: 200,
      headers: {  
        'Content-Type': 'application/json',
      },
     }
  )
}

