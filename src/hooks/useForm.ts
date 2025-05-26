import { ChangeEvent, useEffect, useState } from "react";

//This defines what parameter the hook accepts
interface UseFormProps<T> {
  // Show usages
  initialValue: T; // { email: '', password: '' }
  // 값이 올바른지 검증하는 함수.
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  // no usages
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    // Show usages
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는것
  const getInputProps = (name: keyof T) => {
    // no usages
    const value = values[name];

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // no usages
    ) => handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name); // no usages

    return { value, onChange, onBlur };
  };

  //values가 변경이 될 때마다 에러 검증 로직이 생성됨
  // {email: ''}
  useEffect(() => {
    const newErrors: Record<keyof T, string> = validate(values);
    setErrors(newErrors);
  }, [ValidityState, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
