import React from 'react';

// pretty neat to be able to do something like this kinda automatic...
import { usePosition } from 'use-position';

export const GPSLocation = () => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(true);
  return(<code>
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}
        </code>
  );

};