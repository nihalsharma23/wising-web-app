const API_URL = 'http://localhost:8080/api/visitors';

export const getVisitorCount = async (): Promise<number> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch visitor count');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return 0;
  }
};

export const incrementVisitorCount = async (): Promise<number> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to increment visitor count');
    }
    return await response.json();
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return 0;
  }
};
