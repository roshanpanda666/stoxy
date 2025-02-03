"use client"
export default function DeleteProduct(props) {
    console.log(props.id);


    const deleteRecord = async () => {

        let response = await fetch("/api/productsapi/" + props.id, {
            method: "DELETE",
        })
        //we get the data and called the method delete 
        response = await response.json()
        if (response.success) {
            alert("Product deleted successfully");
            window.location.reload();
        }
    }

    return (
        <>

            <div className='flex justify-center item-center mt-4'>
                <div className='text-green-400'>
                   
                </div>
            </div>

            <div className="border-cyan-400 border-2 hover:border-red-500 w-36 mt-1">
                <button onClick={deleteRecord}>delete</button>
            </div>
        </>

    )

}