import { ValidationError } from '@nestjs/common';

export class DomainError extends Error {
  constructor(errors: ValidationError[], message?: string) {
    const _errors: string[] = [];
    errors.length &&
      errors.forEach((node) => {
        node.constraints &&
          Object.entries(node.constraints).forEach((value) => {
            _errors.push(value[1]);
          });
      });
    super(
      `Errors: ${_errors.join('; ')}${message ? `. Message: ${message}` : ''}`,
    );
    this.name = DomainError.name;
  }
}
