import * as yup from 'yup';
export const createProjectSchema = yup.object({
  name: yup.string().max(100, 'Name must be less than 100 characters.').required('Project name is required.'),
  description: yup.string().max(1000, 'Description must be less than 100 characters.').required('Project description is required'),
  visibility: yup.string().required('Please select project visibility'),
  tags: yup.string()
});