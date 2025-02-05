import React from 'react';
import {Card , CardContent, Typography } from "@material-ui/core";

function InfoBox({title,total}){
    return(
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">{title}
                </Typography>
                <h2 className="infoBox_total">{total}</h2>
            </CardContent>
        </Card>
    )
}

export default InfoBox;