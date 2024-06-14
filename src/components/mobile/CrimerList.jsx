import React from 'react';

const CrimerList = ({ crimers, setSelectedCrimer, setShowCriminalsList }) => {
  return (
    <div className="sm:block sm:w-64 md:w-1/4 lg:w-1/5 xl:w-1/6 p-4 bg-white sm:overflow-y-auto" style={{height: "74vh", maxHeight:"74vh", overflow: "auto"}}>
      <ul className="overflow-y-auto max-h-screen" style={{height: "69vh", overflow: "auto"}}>
        {crimers.map((crimer, index) => (
          <li
            key={index}
            className="bg-white mb-2.5 p-4 rounded-full shadow-lg cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-lg"
            style={{paddingLeft: "40px"}}
            onClick={() => {setSelectedCrimer(crimer); setShowCriminalsList(false);}}
          >
            {crimer.suspects_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrimerList;