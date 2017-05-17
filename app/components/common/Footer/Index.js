import React from 'react';

const Footer = (props) => {
    return (
        <footer>{props.system && props.system.name}</footer>
    );
}

export default Footer;
