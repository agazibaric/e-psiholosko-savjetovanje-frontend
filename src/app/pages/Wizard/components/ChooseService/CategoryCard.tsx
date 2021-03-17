import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 545,
  },
  media: {
    height: 240,
  },
});

export interface CategoryCardProps {
  group: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ group }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + group.category.image}
          title="Select service"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {group.category.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { CategoryCard };
