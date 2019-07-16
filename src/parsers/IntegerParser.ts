import { Parser } from '@/parsers/Parser';
import { NumberParser } from '@/parsers/NumberParser';
import { FieldKind } from '@/types';

export class IntegerParser extends NumberParser {
  get kind(): FieldKind {
    return this.isEnumItem ? 'radio' : 'integer';
  }

  parseExclusiveKeywords() {
    if (this.schema.hasOwnProperty('exclusiveMinimum')) {
      const exclusiveMinimum = this.schema.exclusiveMinimum as number;

      this.attrs.min = exclusiveMinimum + 1;
    }

    if (this.schema.hasOwnProperty('exclusiveMaximum')) {
      const exclusiveMaximum = this.schema.exclusiveMaximum as number;

      this.attrs.max = exclusiveMaximum - 1;
    }
  }

  parseValue(data: unknown) {
    const value = Number(data);
    const parsedValue = Number.parseInt(data as string, 10);

    return Number.isNaN(value) || Number.isNaN(parsedValue) ? undefined : parsedValue;
  }
}

Parser.register('integer', IntegerParser);
