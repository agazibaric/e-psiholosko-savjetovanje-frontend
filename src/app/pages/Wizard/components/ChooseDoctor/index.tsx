import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import DoctorCard from './DoctorCard';
import { Button } from 'app/components';
import { WizardAction, WizardActionType } from '../../reducers/wizardReducer';

const doctors = [
  {
    id: 1,
    firstname: 'Doctor1',
    lastname: 'Lastname1',
    description:
      'prof.klinički psiholog, programska voditeljica za zdravstvene programe',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 2,
    firstname: 'Doctor2',
    lastname: 'Lastname2',
    description: ' mag. psihologije, Viši stručni suradnik',
    image:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    firstname: 'Doctor3',
    lastname: 'Lastname3',
    description: 'mag. psihologije, Stručna suradnica za djecu i mlade',
    image:
      'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1355&q=80',
  },
  {
    id: 4,
    firstname: 'Doctor4',
    lastname: 'Lastname4',
    description: 'mag. psihologije, Stručna suradnica',
    image:
      'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 5,
    firstname: 'Doctor5',
    lastname: 'Lastname5',
    description: 'dipl. socijalna pedagoginja, Stručna suradnica',
    image:
      'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
];

export interface ChooseDoctorProps {
  dispatch: React.Dispatch<WizardAction>;
}

const ChooseDoctor: React.FC<ChooseDoctorProps> = ({ dispatch }) => {
  const [selectedDoctors, setSelectedDoctors] = useState<Array<any>>([]);

  const selectDoctor = (doctor: any) => {
    // If doctor is already selected, unselect it
    if (selectedDoctors.includes(doctor)) {
      const filtered = selectedDoctors.filter(d => d !== doctor);
      setSelectedDoctors(filtered);
    } else {
      // Add doctor to the selected ones
      setSelectedDoctors((prevDoctors: Array<any>) => [...prevDoctors, doctor]);
    }
  };

  const handleOnClick = () => {
    selectedDoctors.length > 0 &&
      dispatch({
        type: WizardActionType.SET_DOCTORS,
        payload: { doctors: selectedDoctors },
      });
  };

  const selectAll = () => {
    setSelectedDoctors(doctors);
  };

  const deselectAll = () => {
    setSelectedDoctors([]);
  };

  const getDoctorCards = () => {
    return doctors.map((doctor: any) => {
      const isSelected = selectedDoctors.includes(doctor);
      return (
        <Grid item xs={12} sm={6} md={4} key={doctor.id}>
          <div onClick={() => selectDoctor(doctor)}>
            <DoctorCard doctor={doctor} isSelected={isSelected} />
          </div>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        {getDoctorCards()}
      </Grid>
      <Button onClick={handleOnClick} disabled={selectedDoctors.length === 0}>
        Choose doctors
      </Button>
      <Button
        onClick={selectAll}
        disabled={selectedDoctors.length === doctors.length}
      >
        Select all
      </Button>
      <Button onClick={deselectAll} disabled={selectedDoctors.length === 0}>
        Deselect all
      </Button>
    </div>
  );
};

export { ChooseDoctor };
