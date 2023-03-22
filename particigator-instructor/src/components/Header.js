import "./Header.css"
import logo from '../assets/particigator-logo.svg'

function Header() {
	return (
		<div className="header">
			<div className="left">
				<img src={logo} className="logo" alt="logo" />
			</div>
			<div className="center">
				<h3>Particigator</h3>
			</div>
			<div className="right">
				<img src={logo} className="logo" alt="logo" />
			</div>
		</div>
	)
}

export default Header;