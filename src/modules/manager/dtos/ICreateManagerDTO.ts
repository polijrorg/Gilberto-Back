interface ICreateManagerDTO {
  image: string
  name: string;
  email: string;
  password: string;
  companyId: string;
  directorId?: string;
}

export default ICreateManagerDTO;
