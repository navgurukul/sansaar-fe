const NG_CONSTANTS = {
  roleNames: {
    student: 'Student',
    team: 'NG Team',
    trainingAndPlacement: 'T & P',
    admissionIncharge: 'Admissions Incharge',
    facha: 'Facha',
    dumbeldore: 'Dumbeldore',
  },
  editRights: {
    student: [],
    team: ['student', 'team', 'trainingAndPlacement', 'admissionIncharge', 'facha'],
    trainingAndPlacement: ['student'],
    admissionIncharge: [],
    facha: ['student', 'trainingAndPlacement', 'admissionIncharge'],
    dumbeldore: [
      'student',
      'team',
      'traningAndPlacement',
      'admissionIncharge',
      'facha',
      'dumbeldore',
    ],
  },
};

export default NG_CONSTANTS;