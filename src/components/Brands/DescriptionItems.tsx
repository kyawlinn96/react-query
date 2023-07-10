import React, { useState } from 'react';

const DescriptionItems = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const renderDescription = () => {
    if (description?.length <= 400) {
      return description;
    }
    if (description?.length > 400) {
      if (showFullDescription) {
        return (
          <>
            {description}
            <button
              className='ml-2 text-sm text-blue-500'
              onClick={toggleDescription}
            >
              See less
            </button>
          </>
        );
      } else {
        const truncatedDescription = description?.substring(0, 400) + '...';
        return (
          <>
            {truncatedDescription.length === 400 ? (
              truncatedDescription
            ) : (
              <>
                {truncatedDescription}
                <button
                  className='text-sm text-blue-500'
                  onClick={toggleDescription}
                >
                  See more
                </button>
              </>
            )}
          </>
        );
      }
    }
  };
  return (
    <div className='px-4 text-justify text-sm font-medium leading-5'>
      {renderDescription()}
    </div>
  );
};
export default DescriptionItems;
