import { useDashboardContext } from '../../pages/DashboardLayout';
import links from '../../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSideBar }) => {
  const { toggleSideBar, user } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;

        //will not display admin tab to non-admin users
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSideBar ? null : toggleSideBar}
            end>
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
