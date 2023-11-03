import { useCallback, useMemo } from 'react';
import { Avatar2DConfig } from '../types';

export const use2dImageUrl = (modelId: string, config?: Avatar2DConfig) => {
  return useMemo(() => {
    let url = `https://models.readyplayer.me/${modelId}.png`;

    if (!config || Object.keys(config).length == 0) {
      return url.toString();
    }

    var params = new URLSearchParams(config).toString();

    return `${url}?${params}`;
  }, [modelId, config]);
};
