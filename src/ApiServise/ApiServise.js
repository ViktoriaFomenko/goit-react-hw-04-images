import axios from 'axios';

const KEY = '28071781-459ddb4c5fc455b50beadddbb';
const BASE_URL = 'https://pixabay.com/api/';

const APIServise = async (query, page) => {
  const URL = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(URL);
  return data;
};

export default APIServise;
