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

export interface ChooseServiceProps {
  handleServiceSelected: (service: Service) => void;
}

const ChooseService = ({ handleServiceSelected }) => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);
  // There are two steps: select group and select service
  const [step, setStep] = useState(0);

  const handleBack = () => {
    setStep(prevActiveStep => prevActiveStep - 1);
  };

  const selectCategory = category => {
    setSelectedCategory(category);
    setStep(1);
  };

  const selectService = (service: Service) => {
    handleServiceSelected(service);
  };

  const getCategoryElements = () => {
    return groups.map((group, index) => {
      return (
        <Grow in={true} timeout={500 * (index + 1)} key={index}>
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
    return group.services.map((service: Service, index: number) => (
      <Grow in={true} timeout={500 * (index + 1)} key={service.name}>
        <Grid item>
          <div onClick={() => selectService(service)}>
            <ServiceCard service={service} />
          </div>
        </Grid>
      </Grow>
    ));
  };

  return (
    <div>
      <Container maxWidth="md" className={classes.main}>
        {step === 0 && (
          <Grid container spacing={5} alignItems="center" justify="center">
            {getCategoryElements()}
          </Grid>
        )}
        {step === 1 && (
          <Grid container spacing={1} alignItems="center">
            <Grow in={true} timeout={500}>
              <Grid item md={4}>
                <CategoryCard group={selectedCategory} />
              </Grid>
            </Grow>
            <Grid item md={8}>
              <Grid container direction="column">
                {getServices(selectedCategory)}
              </Grid>
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
