import { Card, CardContent, Typography } from '@mui/material'
import './Infobox.css'


function Infobox({ title, cases, isRed, active, total, ...props }) {
  return ( 
    <Card className={`infoBox ${active && "infoBox-selected"} ${isRed && "infoBox-red"}`} onClick={props.onClick}>
      <CardContent>
        <Typography className='infoBox_title' color='textSecondary'>{title}</Typography>
        <h2 className={`infoBox_cases ${!isRed && "infoBox_cases_green"}`}>{cases}</h2>
        <Typography className='infoBox_total' color='textSecondary'>{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default Infobox
