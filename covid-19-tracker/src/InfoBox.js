import React from 'react';
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infobox">
            <CardContent>
                {/* Title */}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox_cases">{cases}</h2>

                {/* Total */}
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
