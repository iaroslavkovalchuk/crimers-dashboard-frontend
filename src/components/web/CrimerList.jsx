import React from 'react';

const CrimerList = ({ crimers, setSelectedCrimer }) => {
  return (
    <div className="p-6 border-r border-gray-300 bg-white" style={{width: "22vw", borderRadius: "2.5rem"}}>
      <ul className="overflow-y-auto h-screen max-h-screen pr-5">
        {crimers.map((crimer, index) => (
          <li
            key={index}
            className="bg-white mb-2.5 p-4 rounded-full shadow-lg cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-lg"
            style={{paddingLeft: "40px"}}
            onClick={() => setSelectedCrimer(crimer)}
          >
            {crimer.suspects_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrimerList;
