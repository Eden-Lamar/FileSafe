import React from "react";
import Identicon from "identicon.js";
import box from "../box.jpg";

export default function Navbar({ account }) {
	return (
		<nav className="navbar navbar-dark bg-primary">
			<a
				className="navbar-brand col-sm-3 col-md-2 mr-0"
				href="http://www.dappuniversity.com/bootcamp"
				target="_blank"
				rel="noopener noreferrer"
			>
				{/* <img src={box} width="30" height="30" className="align-top" alt="" /> */}
				File Safe
			</a>
			<ul className="navbar-nav px-3">
				<li>
					<small id="account">
						{account ? (
							<a
								target="_blank"
								alt=""
								className="text-white"
								rel="noopener noreferrer"
								href={"https://etherscan.io/address/" + account}
							>
								{account.substring(0, 6)}...{account.substring(38, 42)}
							</a>
						) : (
							<p>Unable to get account</p>
						)}
					</small>
					{account ? (
						<img
							src={`data:image/jpg;base64, ${new Identicon(account, 30).toString()}`}
							alt=""
							height="30"
							width="30"
							className="ml-2"
						/>
					) : (
						<span></span>
					)}
				</li>
			</ul>
		</nav>
	);
}
