export const FieldTypes = {
    TEXT: 0,
    LINK: 1,
    DATE: 2,
    SELECT: 3,
    INTEGER: 4,
    ESSAY: 5,
    BOOLEAN: 6,
    SECTIONHEADER: 7,
    MULTI: 8
};

export const ProfileFields = {
    name: FieldTypes.TEXT,
    major: FieldTypes.TEXT,
    github: FieldTypes.LINK,
    linkedin: FieldTypes.LINK,
    devpost: FieldTypes.LINK,
    portfolio: FieldTypes.LINK,
    birthday: FieldTypes.DATE
};
