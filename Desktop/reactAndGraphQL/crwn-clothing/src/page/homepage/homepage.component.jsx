import React, { Fragment } from 'react';
import Directory from '../../components/directory/directory.component'

import './homepage.styles.scss';

const HomePage = () => (
    <Fragment>
        <div className='homepage'>
            <Directory />
        </div>
    </Fragment>
);

export default HomePage;