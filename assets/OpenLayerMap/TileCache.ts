import * as FileSystem from 'expo-file-system';

const CACHE_DIR = `${FileSystem.cacheDirectory}map_tiles/`;
const MAX_CACHE_SIZE_MB = 200;

// Convert Mapbox URL to local path
const urlToCachePath = (url: string) => {
  const [z, x, y] = url.match(/\d+\/\d+\/\d+/)[0].split('/');
  return `${CACHE_DIR}${z}/${x}/${y}.webp`;
};

// Cache a tile
export const cacheTile = async (url: string) => {
  const cachePath = urlToCachePath(url);
  
  await FileSystem.makeDirectoryAsync(
    cachePath.substring(0, cachePath.lastIndexOf('/')),
    { intermediates: true }
  );

  await FileSystem.downloadAsync(url, cachePath);
  enforceCacheLimits();
};

// Get cached tile
export const getCachedTile = async (url: string) => {
  const cachePath = urlToCachePath(url);
  const { exists } = await FileSystem.getInfoAsync(cachePath);
  return exists ? cachePath : null;
};

const enforceCacheLimits = async () => {
    const { size } = await FileSystem.getTotalDiskCapacityAsync();
    const cacheSizeMB = size / (1024 * 1024);
  
    if (cacheSizeMB > MAX_CACHE_SIZE_MB) {
      const files = await FileSystem.readDirectoryAsync(CACHE_DIR);
      const sortedFiles = files.sort((a, b) => 
        a.modificationTime - b.modificationTime
      );
      
      // Delete oldest 20%
      for (let i = 0; i < Math.floor(files.length * 0.2); i++) {
        await FileSystem.deleteAsync(`${CACHE_DIR}${sortedFiles[i].uri}`);
      }
    }
  };