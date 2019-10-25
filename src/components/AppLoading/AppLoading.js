import React from 'react'
import Spinner from '../UI/Spinner/Spinner';

const appLoading = () => {

	const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
	const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-font').trim();

	return (
		<div style={{
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: bgColor
		}}>
			<div style={{
				width: "300px",
				height: "100px",
				marginBlockEnd: "100px",
				border: "1px solid #ccc",
				boxShadow: "0 5px 10px #ccc",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center"
			}}>
				<h2 style={{
					fontSize: "1.4em",
					color: fgColor,
					fontWeight: "bold",
					marginBlockStart: "16px"
				}}>Welcome...</h2>
				<Spinner />
			</div>
		</div>
	);
};

export default appLoading;