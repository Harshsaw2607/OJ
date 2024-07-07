import React from 'react'

function DifficultyAndEditorial({EditorialRef,DifficultyRef}) {
  return (
    <>
    <div className='flex mb-3 items-center'>
        <label htmlFor="Difficulty" className="mr-2 ml-5 text-lg" style={{fontFamily: 'Lato',fontWeight: 800,fontStyle: 'bold'}}>Difficulty : </label>
        <input type="text" ref={DifficultyRef} name='Difficulty' id='Difficulty' placeholder='Enter Difficulty' className=' border-none outline-none focus:border-none focus:outline-none rounded-md relative left-[16.5rem] p-2 bg-slate-100 shadow-md text-sm' style={{width:'250px',height:'28px'}}  />
    </div>

    {/* <div className='flex mb-3 items-center'>
        <label htmlFor="Output" className="mr-2 ml-5 text-lg" style={{fontFamily: 'Lato',fontWeight: 800,fontStyle: 'bold'}}>Output : </label>
        <input type="text" name='Output' id='Output' placeholder='Enter Sample Output' className=' border-none outline-none focus:border-none focus:outline-none rounded-md relative left-[17.7rem] p-2 bg-slate-100 shadow-md text-sm' style={{width:'250px',height:'28px'}}  />
    </div> */}

    <div className='flex mb-3 items-center'>
        <label htmlFor="Editorial" className="mr-2 ml-5 text-lg" style={{fontFamily: 'Lato',fontWeight: 800,fontStyle: 'bold'}}>Editorial : </label>
        <textarea name="Editorial" ref={EditorialRef} id="Editorial" rows={5} cols={5} className='mx-5 mb-5 w-[15rem] p-2 outline-none focus:outline-none resize-none overflow-auto relative left-[16rem] bg-slate-50'></textarea>
    </div>

    </>
  )
}

export default DifficultyAndEditorial