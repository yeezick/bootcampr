type InputChangeEvents = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export const handleInputChange = (e: InputChangeEvents, setterFunction: Function): void => {
  const { name, value } = e.target;
  setterFunction((state: any) => {
    return { ...state, [name]: value };
  });
};