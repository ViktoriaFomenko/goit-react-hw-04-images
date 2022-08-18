import { Hearts } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Hearts color="#3f51b5" height="80" width="80" ariaLabel="hearts" />{' '}
    </div>
  );
};
