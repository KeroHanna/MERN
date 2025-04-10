import { FaTimes } from 'react-icons/fa';
import Wrapper from '../wrappers/SmallSideBar';
import { useDashboardContext } from '../../pages/DashboardLayout';
import Logo from './Logo';
import links from '../../utils/links';
import NavLinks from './NavLinks';
const SmallSideBar = () => {
  const { showSidebar, toggleSideBar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
