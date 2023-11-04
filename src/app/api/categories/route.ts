import { NextResponse } from 'next/server'
import { getSubCategory } from '@/utils/general-helper/helper'

//helper function



export const getFullCategories = async (params: any) => {
    const dataFetching = await fetch(`http://192.168.0.253:4000/categories`, {cache: 'force-cache'})
    const data = await dataFetching.json()
    const result = {
        categories: data,
        subCategories: getSubCategory(params, data)
    }
    return result;
    
}
 
export  async function GET() {
    const dataFetching = await fetch(`http://192.168.0.253:4000/categories`)
    const data = await dataFetching.json()
     return NextResponse.json(data, 
     {
      status: 200,
      headers: {  
        'Content-Type': 'application/json',
      },
     }
  )
}

