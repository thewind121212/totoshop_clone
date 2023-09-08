import type { Metadata, ResolvingMetadata } from "next";
import { getBanner } from "../api/categories/category/route";

type Props = {
  params: any
}


export async function generateMetadata ({params }: any, parent: ResolvingMetadata) : Promise<Metadata> {
  const paramCategory = await getBanner()
  const clientParam = params.category[1] 
  const renderMetaTitle = paramCategory.data.find((item: any) => item.name === clientParam)
  return {
    title: renderMetaTitle.param.toUpperCase(),
    description: "Category",
  };

} 




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full h-auto">{children}</div>
    </div>
  );
}
