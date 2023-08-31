import axios from 'axios';

const generateRandomUsername = async (): Promise<string> => {
  const { data } = await axios.post('/api/get-username');
  return data;
};

export default generateRandomUsername;
