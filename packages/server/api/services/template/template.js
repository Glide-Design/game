import { flow, map, set, pick } from 'lodash/fp';
import { map as vanillaMap } from 'lodash';
import { getTemplateSections } from '../../cloudinary/cache';
import {
  transformCsvResponse,
  localFieldsWithSuffix,
  removeLanguageCodeFromKeys,
} from '../../helpers';

export const getTemplateSectionItems = async (templateId, sectionIndex) => {
  const templateData = await getTemplateSections(templateId, transformCsvResponse);
  return templateData[sectionIndex].items.split(',');
};

const localFields = ['name'];

const responseParentKeys = ['externalId', 'name', 'theme'];
const responseThemeKeys = ['displayFormat', 'fgColour', 'bgColour', 'svgBackground'];

export const buildTemplateResponse = async ({ templateId, language }) => {
  try {
    const templateData = await getTemplateSections(templateId, transformCsvResponse);

    const setSectionIds = sections =>
      vanillaMap(sections, (section = {}, index) =>
        set('externalId', `${templateId}_${index}`)(section)
      );

    const itemLocalFields = localFieldsWithSuffix(language)(localFields);

    const getLocaleFields = sections => {
      return flow(
        map(section => ({ ...section, ...pick([...itemLocalFields])(section) })),
        map(removeLanguageCodeFromKeys(itemLocalFields))
      )(sections);
    };

    const transformedResponse = flow(
      setSectionIds,
      getLocaleFields,
      map(section => set('theme', pick(responseThemeKeys)(section))(section)),
      map(pick(responseParentKeys)),
      sections => ({ content: sections })
    )(templateData);

    return transformedResponse;
  } catch (e) {
    return e;
  }
};
