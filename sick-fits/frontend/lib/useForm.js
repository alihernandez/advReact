import { useEffect, useState } from "react";

export default function useForm(initial = {}) {
    // create a state object for our inputs
    const [inputs, setInputs] = useState(initial);
    const initialValues = Object.values(initial).join('');

    useEffect(() => {
        // This function runs when the things we are watching change
        setInputs(initial);
      }, [initialValues]);
    
    function handleChange(e) {
        //destructure the name, value, and type from input 
    let { value, name, type } = e.target;
    if(type === 'number') {
        value = parseInt(value);
    }
    if(type === 'file') {
        [value] = e.target.files;
    }
        setInputs({
            //copy the existing state
            ...inputs,

            // dynamic naming, using variable or property as the actual property of the object
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value])=> [key, ''])
        );
        setInputs(blankState);
    }

    //if you want to surface functionality or data from a custom hook you must return it
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    }
}