import { Student } from '@/types';

export const mockStudents: Student[] = [
  {
    firstName: 'Carrie',
    lastName: 'Long',
    site: 'Arizona Provider Training, LLC',
    status: 'Active',
    history: [
      {
        id: 'C-33015946',
        program: 'HSI Adult First Aid | CPR AED All Ages (2020) - (Blended)-DC',
        date: '05/30/2025',
        status: 'Completed',
      },
      {
        id: 'C-33041598',
        program: 'HSI Adult First Aid | CPR AED All Ages (2020) -DC',
        date: '05/30/2025',
        status: 'Completed',
      },
      {
        id: 'C-33043293',
        program: 'HSI Adult First Aid | CPR AED All Ages (2020) -DC',
        date: '06/03/2025',
        status: 'Digital Cert',
      },
    ],
  },
  {
    firstName: 'Jordan',
    lastName: 'Smith',
    site: 'SafetyWorks Training Center',
    status: 'Active',
    history: [
      {
        id: 'C-33210045',
        program: 'CPR/AED for Professional Rescuers (2020)',
        date: '06/01/2025',
        status: 'Completed',
      },
    ],
  },
];
