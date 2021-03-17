import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { CategoryCard } from './CategoryCard';

// Array of services group by category
const groups = [
  {
    category: { name: 'Za djecu', image: '/images/children.jpg' },
    services: [
      {
        name: 'Psihološka procjena djeteta',
        category: { name: 'Za djecu' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Individualni terapijski rad s djetetom',
        category: { name: 'Za djecu' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Razvoj vještina učenja',
        category: { name: 'Za djecu' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
    ],
  },
  {
    category: { name: 'Za mlade', image: '/images/teenagers.jpg' },
    services: [
      {
        name: 'Psihološko savjetovanje',
        category: { name: 'Za mlade' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Psihološka procjena',
        category: { name: 'Za mlade' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Obiteljska medijacija',
        category: { name: 'Za mlade' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
    ],
  },
  {
    category: { name: 'Za odrasle', image: '/images/adults.jpg' },
    services: [
      {
        name: 'Psihološko savjetovanje',
        category: { name: 'Za odrasle' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Psihološka procjena',
        category: { name: 'Za odrasle' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Obiteljska medijacija',
        category: { name: 'Za odrasle' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
    ],
  },
  {
    category: { name: 'Za organizacije', image: '/images/organization.jpg' },
    services: [
      {
        name: 'Psihološko savjetovanje',
        category: { name: 'Za organizacije' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Psihološka procjena',
        category: { name: 'Za organizacije' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
      {
        name: 'Obiteljska medijacija',
        category: { name: 'Za organizacije' },
        description:
          'Psihološka procjena djeteta uključuje niz postupaka temeljem kojih dječji psiholog donosi zaključak je li riječ o normalnom psihološkom razvoju ili su prisutna određena odstupanja u pojedinim razvojnim područjima.',
        price: 300,
      },
    ],
  },
];

const useStyles = makeStyles({
  main: {
    marginTop: '3rem',
  },
});

const getCategoryElements = () => {
  return groups.map(group => {
    return (
      <Grid item xs={6}>
        <CategoryCard group={group} />
      </Grid>
    );
  });
};

const ChooseService = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="md" className={classes.main}>
        <Grid container spacing={8}>
          {getCategoryElements()}
        </Grid>
      </Container>
    </div>
  );
};

export { ChooseService };
