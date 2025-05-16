
import React from 'react';
import { Button } from './ui/button';

interface DataNotFoundPageProps {
  month?: string;
  onGoBack: () => void;
}

const DataNotFoundPage: React.FC<DataNotFoundPageProps> = ({ month, onGoBack }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-dashboard-blue">404</h1>
      
      <div className="w-40 h-40 my-4">
        <img 
          src="/placeholder.svg" 
          alt="Data not found" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <h3 className="text-2xl font-semibold mt-4 mb-2">
        Looks like you're lost
      </h3>
      
      <p className="text-gray-500 mb-6">
        {month 
          ? `The data for ${month} is not available yet!` 
          : "The data you are looking for is not available!"
        }
      </p>
      
      <Button onClick={onGoBack} className="bg-dashboard-green hover:bg-dashboard-green/90">
        Go to Dashboard
      </Button>
    </div>
  );
};

export default DataNotFoundPage;
