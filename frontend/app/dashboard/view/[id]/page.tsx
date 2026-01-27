'use client'

import { useParams } from "next/navigation";
import ViewProduct from "./viewpage";



export default function viewpage(){
    const params = useParams();
     const id = params?.id
    return (
        <>
         <ViewProduct id={id} />
        </>


    )
}