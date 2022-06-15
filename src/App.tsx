import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import './assets/global.scss';
import AppRouter from './components/AppRouter';
import { setupStore } from './store';

const App: FC = () => {
	const store = setupStore();
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout className='container'>
					<Layout.Content>
						<AppRouter />
					</Layout.Content>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
