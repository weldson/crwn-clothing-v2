import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { CartIcon } from '../../components/cart-icon/cart-icon.component';
import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../context/user.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../context/cart.context';

import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ?
            (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) :
            (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
