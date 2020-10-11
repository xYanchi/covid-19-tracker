import React from 'react';
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

// ...props will get the onClick from InfoBox in App.js
function InfoBox({ title, cases, isRed, active, total, ...props }) {
    return (
        <Card onClick={props.onClick}
            className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/* Title */}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className={`infoBox_cases ${!isRed && 'infoBox_cases--green'}`}>{cases}</h2>

                {/* Total */}
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
