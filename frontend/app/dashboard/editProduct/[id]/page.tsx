import EditProduct from "./editProduct"

export default async function editProductPage({ params }: any) {
  const {id} = await params

  
  return (
    <div>
        <EditProduct id={id}/>
    </div>
  )
}