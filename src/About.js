import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <main className='About'>
            <h1>This is React blog</h1>
            <Link to='/'>
                <p>Please visit our Home Page</p>
            </Link>
        </main>
    );
};

export default About;
