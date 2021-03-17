import { Button, Container, Grid, Grow, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Service } from 'types';
import { CategoryCard } from './CategoryCard';
import { ServiceCard } from './ServiceCard';

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
    marginBottom: '3rem',
  },
});

const getCategoryElements = selectCategory => {
  return groups.map((group, index) => {
    return (
      <Grow in={true} timeout={500 * (index + 1)}>
        <Grid item xs={12} sm={12} md={6}>
          <div onClick={() => selectCategory(group)}>
            <CategoryCard group={group} />
          </div>
        </Grid>
      </Grow>
    );
  });
};

const getServices = group => {
  return group.services.map((service: Service, index) => (
    <Grow in={true} timeout={500 * (index + 1)}>
      <Grid item direction="column">
        <div>
          <ServiceCard service={service} />
        </div>
      </Grid>
    </Grow>
  ));
};

const ChooseService = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);

  const handleBack = () => {
    setStep(prevActiveStep => prevActiveStep - 1);
  };

  const selectCategory = category => {
    setSelected(category);
    setStep(1);
  };

  return (
    <div>
      <Container maxWidth="md" className={classes.main}>
        {step === 0 && (
          <Grid container spacing={5} alignItems="center" justify="center">
            {getCategoryElements(selectCategory)}
          </Grid>
        )}
        {step === 1 && (
          <Grid container spacing={1} alignItems="center">
            <Grow in={true} timeout={500}>
              <Grid item md={4}>
                <CategoryCard group={selected} />
              </Grid>
            </Grow>
            <Grid item md={8}>
              <Grid container>{getServices(selected)}</Grid>
            </Grid>
          </Grid>
        )}
      </Container>
      <div>
        <Button disabled={step === 0} onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export { ChooseService };
