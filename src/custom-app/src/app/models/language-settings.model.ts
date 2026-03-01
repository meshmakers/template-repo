import { LanguageDto } from './language.model';

export interface LanguageSettingsDto {
  defaultLanguage: LanguageDto;
  supportedLanguages: LanguageDto[];
}
