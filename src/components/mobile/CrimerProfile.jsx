import React from 'react';

const process_image_url = (url) => {
  if (url.includes('Fugitive/GetImage')) {
      let parts = url.split('/');

      let lastElement = parts[parts.length - 1];

      console.log(lastElement); // Output: 1084191
      return import.meta.env.VITE_REACT_APP_DATA_HOST + lastElement
  } else {
      console.log("URL does not contain 'Fugitive/GetImage'");
      return url
  }
}

const CrimerProfile = ({ crimer }) => {

  const description_list = (crimer.description || "").split('\n');
  return (
    <div className='bg-cover bg-center h-screen' style={{height: "80vh", maxHeight: "80vh", overflow: "auto"}}>
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-md mx-auto'>
          <div className='bg-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1.5 p-6' style={{borderRadius: "50px"}}>
            <div className='flex flex-col items-center justify-center'>
              <img src={process_image_url(crimer?.image_url || "" )} alt='Avatar' className='rounded-full border-4 border-white' style={{width:"200px", height: "200px"}}/>
              <h6 className='mt-4'>
                <a href={crimer.url} className='text-3xl hover:text-blue-800' style={{fontFamily: "cursive"}}>{crimer.suspects_name}</a>
              </h6>
            </div>
            <hr className='my-3'/>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/2 p-2'>
                <h5 className='text-xl font-bold ml-3 mb-2 text-gray-800'>
                  Description
                </h5>
                <div className='overflow-auto border rounded-3xl p-4 h-48'>
                  {description_list.map((description, index) => (
                    <p key={index} className='text-gray-700'>
                      {description}
                    </p>
                  ))}
                </div>
              </div>
              <div className='w-full md:w-1/2 p-2'>
                <h5 className='text-xl font-bold ml-3 mb-2 text-gray-800'>
                  Suspected Crimes
                </h5>
                <div className='overflow-auto border rounded-3xl p-4 h-48'>
                  <p className='ml-2 text-gray-700'>
                    {crimer.suspected_crimes}
                  </p>
                </div>
              </div>
            </div>
            
            
            <h6 className='text-xl font-bold mt-3 ml-3 mb-2 text-gray-800'>
              Possible Location
            </h6>
            <div className='overflow-auto border rounded-3xl p-2 h-20 m-2'>
              <p className='ml-2 text-gray-700'>
                {crimer.possible_location}
              </p>
            </div>

            <h6 className='text-xl font-bold mt-3 ml-3 mb-2 text-gray-800'>
              Agency Text
            </h6>
            <div className='overflow-auto border rounded-3xl p-4 h-32 m-2'>
              <p className='ml-2 text-gray-700'>
                {crimer.agency_text}
              </p>
            </div>
            
            
            <h6 className='text-xl font-bold mt-3 ml-3 mb-2 text-gray-800'>
              Reward Amount
            </h6>
            <div className='overflow-auto border rounded-3xl p-2 h-20 m-2'>
              <p className='ml-2 text-gray-700'>
                {crimer.reward_amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrimerProfile;
