// CHILD OF NAV

import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

const HowToUse = () => (

    <div>

        <Typography variant="h6" gutterBottom>
            Welcome to <em>SUP</em> Lets get started!:
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom>

            <ul>
                <li>Tap on the Map to find a bed, a meal, a food parcel or other service.</li>
                <li>Don't worry about telling the map where you are! We'll grab that info for you.</li>
                <li>Use the box on the bottom left to filter for the services you're looking for.</li>
                <li>If you want the address just zoom in on the map marker or tap the marker for more info.</li>
            </ul>
        </Typography>


    </div>
)

export default HowToUse
