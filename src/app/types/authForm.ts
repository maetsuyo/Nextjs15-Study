export interface AuthFormProps {
  title: string;
  message: string;
  username: string;
  password: string;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};