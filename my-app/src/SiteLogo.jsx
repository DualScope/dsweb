import { Link } from 'react-router-dom';
import { asset } from './siteConfig';

const SiteLogo = ({ variant = 'white', className = 'h-20 w-auto sm:h-28' }) => (
  <Link to="/" className="fixed left-4 top-4 flex items-center z-20" aria-label="Back to home">
    <img
      src={asset(variant === 'black' ? '/assets/logo/png-black.png' : '/assets/logo/png-white.png')}
      alt="DSFILMS logo"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
    />
  </Link>
);

export default SiteLogo;
