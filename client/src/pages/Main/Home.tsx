import React from 'react';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
	React.useEffect(() => {
		const abort = new AbortController();

		return () => {
			abort.abort();
		};
	}, []);

	return <div>asdasd</div>;
};

export default Home;
