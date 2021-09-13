export class CreateCustomerDto {
  name: string;
  email: string;
  street?: string;
  street_number?: string;
  city: string;
  state?: string;
  country: string;
  phones?: string[];
}
