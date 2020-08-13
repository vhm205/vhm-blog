import styled, { keyframes } from 'styled-components';

export const scan = keyframes`
	0% {
		background-position: 0 -100vh;
	}

	35%,
	100% {
		background-position: 0 100vh;
	}
`;

export const Container = styled.div`
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	background-color: #000000;
	background-image: radial-gradient(#11581e, #041607),
		url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif');
	background-repeat: no-repeat;
	background-size: cover;
	font-family: 'Inconsolata', Helvetica, sans-serif;
	font-size: 1.5rem;
	color: rgba(128, 255, 128, 0.8);
	text-shadow: 0 0 1ex #33ff33, 0 0 2px rgba(255, 255, 255, 0.8);
`;

export const Link = styled.a`
	color: #fff;
	text-decoration: none;
	&:before {
		content: '[';
	}
	&::after {
		content: ']';
	}
`;

export const Noise = styled.div`
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif');
	background-repeat: no-repeat;
	background-size: cover;
	z-index: -1;
	opacity: 0.02;
`;

export const Overlay = styled.div`
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	background: repeating-linear-gradient(
		180deg,
		transparent 0,
		rgba(0, 0, 0, 0.3) 50%,
		transparent 100%
	);
	background-size: auto 4px;
	z-index: 1;
	&::before {
		content: '';
		pointer-events: none;
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			0deg,
			transparent 0%,
			rgba(32, 128, 32, 0.2) 2%,
			rgba(32, 128, 32, 0.8) 3%,
			rgba(32, 128, 32, 0.2) 3%,
			transparent 100%
		);
		background-repeat: no-repeat;
		animation: ${scan} 7.5s linear 0s infinite;
`;

export const Terminal = styled.div`
	box-sizing: inherit;
	position: absolute;
	height: 100%;
	width: 1000px;
	max-width: 100%;
	padding: 4rem;
	text-transform: uppercase;
`;

export const Output = styled.p`
	color: rgba(128, 255, 128, 0.8);
	text-shadow: 0 0 1px rgba(51, 255, 51, 0.4), 0 0 2px rgba(255, 255, 255, 0.8);
	&::before {
		content: '> ';
	}
`;

export const ErrorCode = styled.span`
	color: white;
`;
