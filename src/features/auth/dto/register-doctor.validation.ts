import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { RegisterDTO } from './register.dto';
import { UserRole } from '@shared/enums';

export function Doctor(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Doctor',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dto = args.object as RegisterDTO;
          // If the role is DOCTOR, the property should be defined and not empty
          if (dto.role.toLowerCase() == UserRole.DOCTOR.toLowerCase()) return !!value;
          // If the role is PATIENT, the property should be undefined
          else if (dto.role.toLowerCase() == UserRole.PATIENT.toLowerCase()) return value === undefined;
          else return false;
        },
        defaultMessage(args: ValidationArguments) {
          const dto = args.object as RegisterDTO;
          const field = args.property.charAt(0).toUpperCase() + args.property.slice(1);
          if (dto.role === UserRole.DOCTOR) {
            return `${field} is required when role is doctor`;
          }
          return `${field} is only allowed when role is doctor`;
        },
      },
    });
  };
}
