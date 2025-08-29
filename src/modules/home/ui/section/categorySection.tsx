"use client";
import FilterCrawsle from "@/components/filter-crwsel";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
interface categoriesProps{
        categoryId?: string
}


export const CategrorySection = ({categoryId} : categoriesProps) => {

    return (
        <Suspense fallback={<FilterCrawsle isLoading data={[]} onselect={() =>{}} />}>
            <ErrorBoundary fallback={<p>Error......</p>}>
                <CategrorySectionSuspence categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}
 const  CategrorySectionSuspence = ({categoryId} : categoriesProps) => {
    const router = useRouter();
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    const data = categories.map((category) => ({
        value: category.id,
        label : category.name
    }));

    const onSelect = (value : string | null) =>{
        let url = new URL(window.location.href);
        if(value){
            url.searchParams.set("categoryId", value)
        }else{
            url.searchParams.delete("cetegoryId")
        }
        router.push(url.toString())
    }
return<FilterCrawsle onselect={onSelect} value={categoryId} data={data} />
}