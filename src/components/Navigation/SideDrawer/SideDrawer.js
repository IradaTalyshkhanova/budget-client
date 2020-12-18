import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav>
                    <ul className={classes.NavigationItems}>
                        <NavigationItem sideDrawer={true} exact={true} link="/">Homepage</NavigationItem>
                        <NavigationItem sideDrawer={true} link="/Dashboard">Dashboard</NavigationItem>
                    </ul>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;