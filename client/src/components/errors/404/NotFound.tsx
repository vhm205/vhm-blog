import React from 'react';
import {
	Container,
	Noise,
	Overlay,
	Output,
	Terminal,
	ErrorCode,
	Link,
} from './style';

const NotFound: React.FC = () => {
	return (
		<Container>
			<Noise />
			<Overlay />
			<Terminal>
				<h1>
					Error <ErrorCode>404</ErrorCode>
				</h1>
				<Output>
					The page you are looking for might have been removed, had its name
					changed or is temporarily unavailable.
				</Output>
				<Output>
					Please try to <Link href="/">go back</Link> or
					<Link href="/">return to the homepage</Link>
				</Output>
				<Output>Good luck.</Output>
			</Terminal>
		</Container>
	);
};

export default NotFound;
