import { Button, Flex, Box } from "@chakra-ui/react";
import React, {useEffect} from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {state, setState}:any = useData();
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required").typeError('Enter a valid string'),
        jobDetails: Yup.string().required("Job Details is required").typeError('Enter a valid string'),
        jobLocation: Yup.string().required("Job Location is required").typeError('Enter a valid string'),
      }),
      onSubmit: (values) => {
        console.log('satte', state);
        console.log({values});
        setState((prevState:any) => ({
          ...prevState,
          jobDetails: values,
        }));
        handleTab(2);
      },
    });
    function changedData(values:any) {
      setState((prevState:any) => ({
        ...prevState,
        jobDetails: values,
      }));
    }
    useEffect(()=> {
      changedData(values);
    }, [values.jobDetails, values.jobLocation, values.jobTitle])
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors?.jobLocation}
          touched={touched?.jobLocation}
          value={values?.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
