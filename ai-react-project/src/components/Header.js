import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
	return (
		<header className="header">
			<div className="header__inner">
				<NavLink to="/" className="header__brand">
					ToneFlow
				</NavLink>

				<nav className="header__nav" aria-label="주요 메뉴">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`header__link ${isActive ? 'header__link--active' : ''}`
						}
					>
						랜딩
					</NavLink>
					<NavLink
						to="/detail"
						className={({ isActive }) =>
							`header__link ${isActive ? 'header__link--active' : ''}`
						}
					>
						상세
					</NavLink>
					<NavLink to="/login" className="header__button">
						로그인
					</NavLink>
				</nav>
			</div>
		</header>
	);
}

export default Header;
