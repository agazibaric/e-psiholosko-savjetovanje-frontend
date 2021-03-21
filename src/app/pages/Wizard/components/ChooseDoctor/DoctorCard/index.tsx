import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectedCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right, #ff3300, #993366)',
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    minWidth: '10rem',
    minHeight: '10rem',
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'center',
    direction: 'rtl',
  },
  media: {
    height: 300,
    borderRadius: '40%',
  },
});

export interface DoctorCardProps {
  doctor: any;
  isSelected: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, isSelected }) => {
  const classes = useStyles(isSelected);

  return (
    <Card className={isSelected ? classes.selectedCard : classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={doctor.image}
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${doctor.firstname} ${doctor.lastname}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {doctor.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DoctorCard;
