export interface UserAuth {
  name: string;
  email: string;
  phone: string;
  password?: string
  profilePicture?: File | string;
  cpf: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}
